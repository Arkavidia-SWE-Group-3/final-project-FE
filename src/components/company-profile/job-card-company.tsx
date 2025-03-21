import { Card, CardContent, CardFooter } from "../ui/card";
import { formatNumberCommas } from "@/lib/utils";
import { countTimeAfterDate } from "@/lib/utils";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  SquareKanban,
  Locate,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CompanyJob, CompanySkill } from "@/types/company/types";

export function JobCardCompany({
  job,
  company_slug,
  onEdit,
  onDelete,
  allowEdit,
}: {
  job: CompanyJob;
  onEdit: () => void;
  onDelete: () => void;
  allowEdit: boolean;
  company_slug: string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-sm transition-shadow">
      <CardContent className="p-0">
        <div className="p-6 py-3">
          <div className="flex items-start justify-between gap-4 max-md:flex-col max-md:gap-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{job.title}</h2>

              <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.job_type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>
                    {formatNumberCommas(job.min_salary) +
                      " - " +
                      formatNumberCommas(job.max_salary)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{countTimeAfterDate(job.posted)}</span>
                </div>
                <div className="flex items-center">
                  <SquareKanban className="h-4 w-4 mr-1" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <Locate className="h-4 w-4 mr-1" />
                  <span>{job.location_type}</span>
                </div>
              </div>
            </div>
            {allowEdit && (
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4 bg-muted/10 border-t max-md:flex-col max-md:gap-4">
        {allowEdit && (
          <Link href={`/company/${company_slug}/applicants/${job.id}`}>
            <Button size="sm">View Applications</Button>
          </Link>
        )}

        <Link href={`/job/${job.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
