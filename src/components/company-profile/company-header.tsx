"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type ImageUploadType = "logo" | "cover";

export default function CompanyHeader({
  companyData,
  allowEdit = false,
}: {
  companyData: {
    id: string;
    name: string;
    logo: string;
    cover: string;
    industry: string;
    specialties: string[];
  };
  allowEdit?: boolean;
}) {
  // Company state
  const [company, setCompany] = useState(companyData);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [editedCompany, setEditedCompany] = useState(companyData);

  // Image upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadImageType, setUploadImageType] =
    useState<ImageUploadType>("logo");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Company Info Handlers
  const openEditCompany = () => {
    setEditedCompany({ ...company });
    setIsEditingCompany(true);
  };

  const saveCompanyInfo = () => {
    setCompany({ ...editedCompany });
    setIsEditingCompany(false);
  };

  // Image Upload Handlers
  const openImageUpload = (type: ImageUploadType) => {
    setUploadImageType(type);
    setImagePreview(null);
    setIsUploadingImage(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const saveImage = () => {
    if (imagePreview) {
      if (uploadImageType === "logo") {
        setCompany({ ...company, logo: imagePreview });
      } else {
        setCompany({ ...company, cover: imagePreview });
      }
    }
    setIsUploadingImage(false);
  };

  return (
    <>
      <Card className="py-0">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="relative h-56 bg-primary/10 rounded-t-lg">
            <Image
              src={company.cover || "/placeholder.svg"}
              alt={`${company.name} cover`}
              fill
              className="object-cover rounded-t-lg"
            />
            {allowEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => openImageUpload("cover")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            )}
          </div>

          {/* Company Info */}
          <div className="p-6 pt-0 relative">
            {/* Centered Company Logo */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    width={128}
                    height={128}
                    alt={`${company.name} logo`}
                    className="object-cover"
                  />
                </div>
                {allowEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm hover:bg-muted"
                    onClick={() => openImageUpload("logo")}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Company info section */}
            <div className="space-y-4 relative">
              {allowEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0"
                  onClick={openEditCompany}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              <div className="text-center">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <p className="text-muted-foreground">{company.industry}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {allowEdit && (
        <>
          {" "}
          <Dialog open={isUploadingImage} onOpenChange={setIsUploadingImage}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {uploadImageType === "logo"
                    ? "Upload Company Logo"
                    : "Upload Cover Image"}
                </DialogTitle>
                <DialogDescription>
                  {uploadImageType === "logo"
                    ? "Upload a logo to represent your company. Square images work best."
                    : "Upload a cover image for your company profile. Recommended size: 1200x300 pixels."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {imagePreview ? (
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`relative ${
                        uploadImageType === "logo"
                          ? "w-32 h-32 rounded-full"
                          : "w-full h-40 rounded-md"
                      } overflow-hidden border-2 border-dashed border-muted-foreground/25`}
                    >
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button variant="outline" onClick={triggerFileInput}>
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center gap-4 cursor-pointer ${
                      uploadImageType === "logo"
                        ? "w-32 h-32 rounded-full mx-auto"
                        : "w-full h-40 rounded-md"
                    } border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors`}
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Click to upload, or drag and drop
                      <br />
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadingImage(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveImage} disabled={!imagePreview}>
                  Save Image
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isEditingCompany} onOpenChange={setIsEditingCompany}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>Edit Company Information</DialogTitle>
                <DialogDescription>
                  Update your company details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 overflow-y-auto pr-1">
                <div className="grid gap-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={editedCompany.name}
                    onChange={(e) =>
                      setEditedCompany({
                        ...editedCompany,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={editedCompany.industry}
                    onChange={(e) =>
                      setEditedCompany({
                        ...editedCompany,
                        industry: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingCompany(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveCompanyInfo}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
