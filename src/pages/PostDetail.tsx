import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/types/supabase";
import { supabase } from "@/config/supabase";

type Post = Tables<"Posts">;
type Project = Tables<"Proyect">;

// Mock data for when database is empty
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Machine Learning Research Assistant",
    general_description:
      "Join our team to work on cutting-edge machine learning projects focusing on natural language processing and computer vision.",
    requirements_description:
      "Strong background in Python, TensorFlow/PyTorch, and linear algebra. Experience with ML research papers is a plus.",
    published_by: "Dr. Sarah Chen",
    deadline: "2024-12-31",
    created_at: "2024-01-01T12:00:00Z",
  },
  {
    id: 2,
    title: "Web Development Internship",
    general_description:
      "Work with our development team to build modern web applications using React and Node.js.",
    requirements_description:
      "Proficiency in JavaScript, React, and REST APIs. Knowledge of TypeScript is preferred.",
    published_by: "Tech Innovations Inc.",
    deadline: "2024-11-15",
    created_at: "2024-01-01T12:00:00Z",
  },
  {
    id: 3,
    title: "Data Science Project",
    general_description:
      "Analyze large datasets and create predictive models for business intelligence applications.",
    requirements_description:
      "Strong skills in Python, pandas, scikit-learn, and SQL. Experience with data visualization tools.",
    published_by: "Analytics Corp",
    deadline: "2025-01-20",
    created_at: "2024-01-01T12:00:00Z",
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    post_title: "Exciting ML Research Opportunity!",
    post_caption:
      "We're looking for talented students to join our machine learning research team. This is a great opportunity to work on real-world AI problems and publish your work. Perfect for students interested in NLP and computer vision!",
    project_id: 1,
    created_at: "2024-01-01T12:00:00Z",
  },
  {
    id: 2,
    post_title: "Join Our Web Dev Team",
    post_caption:
      "Looking for passionate developers to help build the next generation of web applications. You'll work with modern technologies and learn from experienced engineers.",
    project_id: 2,
    created_at: "2024-01-02T15:30:00Z",
  },
  {
    id: 3,
    post_title: "Data Science Internship Available",
    post_caption:
      "Great opportunity for students interested in data science and analytics. Work with real business data and create impactful insights.",
    project_id: 3,
    created_at: "2024-01-03T09:45:00Z",
  },
];

export default function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPostAndProject = async () => {
      setIsLoading(true);
      try {
        // Fetch post
        const { data: postData, error: postError } = await supabase
          .from("Posts")
          .select("*")
          .eq("id", Number(postId))
          .single();

        let currentPost: Post | null = null;
        let currentProject: Project | null = null;

        if (postError || !postData) {
          // Use mock data if post not found
          console.log("Post not found in database, using mock data");
          currentPost = mockPosts.find((p) => p.id === Number(postId)) || null;

          if (currentPost) {
            currentProject =
              mockProjects.find((p) => p.id === currentPost!.project_id) ||
              null;
          }
        } else {
          currentPost = postData;

          // Fetch related project
          const { data: projectData, error: projectError } = await supabase
            .from("Proyect")
            .select("*")
            .eq("id", postData.project_id)
            .single();

          if (projectError || !projectData) {
            // Use mock project if not found
            console.log("Project not found in database, using mock data");
            currentProject =
              mockProjects.find((p) => p.id === postData.project_id) || null;
          } else {
            currentProject = projectData;
          }
        }

        if (currentPost) {
          setPost(currentPost);
          setProject(currentProject);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error loading post:", error);
        // Fallback to mock data on error
        const currentPost =
          mockPosts.find((p) => p.id === Number(postId)) || null;
        if (currentPost) {
          setPost(currentPost);
          setProject(
            mockProjects.find((p) => p.id === currentPost.project_id) || null
          );
        } else {
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPostAndProject();
  }, [postId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-1/2 p-0 m-4">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container h-16 flex items-center gap-4 p-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Post</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center">
          <Card className="border-none shadow-none w-full p-0">
            {/* Post Header */}
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{post.post_title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Posted on{" "}
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Post Content */}
              <div className="space-y-4">
                <p className="text-base leading-relaxed">{post.post_caption}</p>
              </div>

              {/* Project Information */}
              {project && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Related Project</h3>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-base">
                        {project.title}
                      </h4>
                      {project.general_description && (
                        <p className="text-sm text-muted-foreground">
                          {project.general_description}
                        </p>
                      )}
                      {project.requirements_description && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Requirements:</p>
                          <p className="text-sm text-muted-foreground">
                            {project.requirements_description}
                          </p>
                        </div>
                      )}
                      {project.deadline && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Deadline:</span>{" "}
                          {new Date(project.deadline).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Published by:</span>{" "}
                        {project.published_by}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <Button
              className="m-2"
              onClick={() => {
                navigate(`/deliver/${postId}`);
              }}
            >
              Tomar proyecto
            </Button>
          </Card>
        </main>
      </Card>
    </div>
  );
}
