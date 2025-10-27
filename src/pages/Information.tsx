import { TextDisplay } from "@/components/TextDisplay";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Information() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <TextDisplay
          title="Bienvenido a DevUM"
          content="Este projecto ayuda a conectar a estudiantes con proyectos reales, facilitando la colaboración y el aprendizaje práctico."
          variant="gradient"
          size="lg"
        />

        <TextDisplay
          title="Características Principales"
          content={[
            "Explora una variedad de proyectos publicados por empresas y organizaciones.",
            "Postula a proyectos que se alineen con tus intereses y habilidades.",
            "Publica tus resultados y recibe retroalimentación de la comunidad.",
          ]}
          variant="highlight"
          size="md"
        />

        <TextDisplay
          content="Sugerencias son aceptadas para mejorar la plataforma y adaptarla a las necesidades de los usuarios."
          variant="default"
          size="sm"
        />

        <Button className="m-1" variant="outline" onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
        <Button
          className="m-1"
          variant="outline"
          onClick={() =>
            window.open("https://github.com/santi34mg/devum", "_blank")
          }
        >
          Contribuir en GitHub
        </Button>
      </div>
    </div>
  );
}
