import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ProjectDelivery() {
  const [deliveryLink, setDeliveryLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Project delivery link submitted:", deliveryLink);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Submit Project Delivery</CardTitle>
          <CardDescription>
            Please provide the link to your project delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-4">
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                ✓ Successfully submitted!
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Your project delivery link has been recorded.
              </p>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="outline"
              >
                Go To Home
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="deliveryLink"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Project Delivery Link
                </label>
                <Input
                  id="deliveryLink"
                  type="url"
                  placeholder="https://..."
                  value={deliveryLink}
                  onChange={(e) => setDeliveryLink(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !deliveryLink}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
