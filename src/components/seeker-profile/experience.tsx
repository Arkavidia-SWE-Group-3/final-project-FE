"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Building,
  Calendar as CalendarIcon,
  Edit,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { DatePicker } from "../ui/date-picker";
import { UserAPI } from "@/api/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { convertDateFormat } from "@/lib/utils";

export default function Experience({
  experienceData,
  allowEdit = false,
}: {
  experienceData: {
    id: string;
    title: string;
    company: string;
    company_id: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];
  allowEdit?: boolean;
}) {
  const router = useRouter();
  const formSchema = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    location: z.string().nonempty(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      //@ts-ignore
      startDate: null,
      endDate: null,
      description: "",
    },
  });

  const companies = [
    {
      id: "a5d5769a-e911-40b0-8099-b50135c207e5",
      name: "Google",
    },
    {
      id: "077a8d39-6ddb-4473-96be-65a017ea9d3c",
      name: "Facebook",
    },
    {
      id: "b488d163-ecad-419c-bf42-ecf36dee1709",
      name: "Microsoft",
    },
    {
      id: "30d65c83-7d89-4f9a-a5ee-5139eae5af73",
      name: "Amazon",
    },
  ];

  // Experience State
  const [experiences, setExperiences] = useState<
    {
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: Date;
      endDate: Date | null;
      description: string;
    }[]
  >(experienceData);

  useEffect(() => {
    setExperiences(experienceData);
  }, [experienceData]);

  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<number>(0);

  // Experience Handlers
  const editExperience = (experience: any) => {
    setCurrentExperience(experience.id);
    form.setValue("title", experience.title);
    form.setValue("company", experience.company_id);
    form.setValue("location", experience.location);
    form.setValue("startDate", new Date(experience.startDate));
    form.setValue("endDate", experience.endDate);
    form.setValue("description", experience.description);
    setIsEditingExperience(true);
  };

  const addNewExperience = () => {
    setIsEditingExperience(true);
  };

  const deleteExperience = async (id: string) => {
    await UserAPI.deleteExperience({
      id,
    })
      .then(() => {
        toast.success("Experience deleted successfully");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete experience");
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, company, location, startDate, endDate, description } =
      values;
    if (currentExperience) {
      await UserAPI.updateExperience({
        experience_id: currentExperience,
        company_id: company,
        title,
        location,
        start_date: convertDateFormat(startDate),
        end_date: endDate ? convertDateFormat(endDate) : "1970-01-01",
        description,
      })
        .then(() => {
          toast.success("Experience updated successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to update experience");
        });
      setCurrentExperience(0);
    } else {
      await UserAPI.addExperience({
        company_id: company,
        title,
        location,
        start_date: convertDateFormat(startDate),
        end_date: endDate != null ? convertDateFormat(endDate) : "1970-01-01",
        description,
      })
        .then(() => {
          toast.success("Experience added successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to add experience");
        });
    }

    setIsEditingExperience(false);
    form.reset();
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Experience</CardTitle>
          </div>
          {allowEdit && (
            <Button onClick={addNewExperience} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="border rounded-lg p-4 relative group"
            >
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {allowEdit && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => editExperience(experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-4 max-md:flex-col">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{experience.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>
                      {experience.startDate?.toLocaleDateString() || "Present"}{" "}
                      - {experience.endDate?.toLocaleDateString() || "Present"}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{experience.location}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {allowEdit && (
        <Dialog
          open={isEditingExperience}
          onOpenChange={setIsEditingExperience}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentExperience ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
              <DialogDescription>
                Add or update your work experience details
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            {companies.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <DatePicker
                        form={form}
                        name="startDate"
                        label="Start Date"
                      />
                    </div>
                    <div className="grid gap-2">
                      <DatePicker
                        form={form}
                        name="endDate"
                        label="End Date"
                        disabled={form.watch("endDate") ? false : true}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={!form.watch("endDate")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              form.setValue("endDate", null);
                            } else {
                              form.setValue("endDate", new Date());
                            }
                          }}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I'm currently working here
                        </label>
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setIsEditingExperience(false);
                      setCurrentExperience(0);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
