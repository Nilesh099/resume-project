import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, Plus, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocalStorageApi from "./../../../../../service/LocalStorageApi";
import { toast } from "sonner";
import PropTypes from "prop-types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Project Item Component
function SortableProjectItem({
  project,
  index,
  onProjectChange,
  onRemoveTech,
  onAddTech,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border p-4 my-4 rounded-lg bg-white shadow-sm"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-sm">Project {index + 1}</h3>
        <div
          {...listeners}
          className="cursor-grab hover:cursor-grabbing p-1 rounded"
          title="Drag to reorder"
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 6h8v2H6V6zm0 4h8v2H6v-2z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium">Project Title</label>
          <Input
            name="title"
            placeholder="E.g., E-commerce Website"
            value={project.title || ""}
            onChange={(e) => onProjectChange(index, "title", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-medium">Project URL</label>
          <Input
            name="url"
            placeholder="https://github.com/username/project"
            value={project.url || ""}
            onChange={(e) => onProjectChange(index, "url", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium">Description</label>
          <Textarea
            name="description"
            placeholder="Brief description of the project..."
            value={project.description || ""}
            onChange={(e) =>
              onProjectChange(index, "description", e.target.value)
            }
            rows={3}
          />
        </div>

        {/* Tech Stack Section */}
        <div className="col-span-2">
          <label className="text-xs font-medium">Tech Stack</label>
          <div className="space-y-2 mt-1">
            {(project.techStack || [""]).map((tech, techIndex) => (
              <div key={techIndex} className="flex gap-2 items-center">
                <Input
                  placeholder="Technology (e.g., React, Node.js)"
                  value={tech}
                  onChange={(e) => {
                    const newTechStack = [...(project.techStack || [])];
                    newTechStack[techIndex] = e.target.value;
                    onProjectChange(index, "techStack", newTechStack);
                  }}
                  className="flex-1"
                />
                {(project.techStack || []).length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveTech(index, techIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAddTech(index)}
              className="text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Technology
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add PropTypes for SortableProjectItem
SortableProjectItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onProjectChange: PropTypes.func.isRequired,
  onRemoveTech: PropTypes.func.isRequired,
  onAddTech: PropTypes.func.isRequired,
};

function Projects({ enabledNext }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [projectsList, setProjectsList] = useState([
    {
      id: "1",
      title: "",
      url: "",
      description: "",
      techStack: [""],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    // Initialize projects data when resumeInfo becomes available
    if (resumeInfo?.projects && resumeInfo.projects.length > 0) {
      // Ensure each project has an id for drag-drop
      const projectsWithIds = resumeInfo.projects.map((project, index) => ({
        ...project,
        id: project.id || String(index + 1),
        techStack: project.techStack || [""],
      }));
      setProjectsList(projectsWithIds);
    } else if (resumeInfo && (!resumeInfo.projects || resumeInfo.projects.length === 0)) {
      // Initialize with one empty project if no projects exist
      setProjectsList([
        {
          id: "1",
          title: "",
          url: "",
          description: "",
          techStack: [""],
        },
      ]);
    }
  }, [resumeInfo?.projects]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projectsList];
    newProjects[index][field] = value;
    setProjectsList(newProjects);

    // Update resumeInfo immediately when projects change
    setResumeInfo(prevResumeInfo => ({
      ...prevResumeInfo,
      projects: newProjects,
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProjectsList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newProjects = arrayMove(items, oldIndex, newIndex);

        // Update resumeInfo immediately after drag
        setResumeInfo(prevResumeInfo => ({
          ...prevResumeInfo,
          projects: newProjects,
        }));

        return newProjects;
      });
    }
  };

  const addNewProject = () => {
    const newProjects = [
      ...projectsList,
      {
        id: String(Date.now()),
        title: "",
        url: "",
        description: "",
        techStack: [""],
      },
    ];
    setProjectsList(newProjects);

    // Update resumeInfo immediately
    setResumeInfo(prevResumeInfo => ({
      ...prevResumeInfo,
      projects: newProjects,
    }));
  };

  const removeProject = () => {
    if (projectsList.length > 1) {
      const newProjects = projectsList.slice(0, -1);
      setProjectsList(newProjects);

      // Update resumeInfo immediately
      setResumeInfo(prevResumeInfo => ({
        ...prevResumeInfo,
        projects: newProjects,
      }));
    }
  };

  const addTech = (projectIndex) => {
    const newProjects = [...projectsList];
    if (!newProjects[projectIndex].techStack) {
      newProjects[projectIndex].techStack = [];
    }
    newProjects[projectIndex].techStack.push("");
    setProjectsList(newProjects);

    // Update resumeInfo immediately
    setResumeInfo(prevResumeInfo => ({
      ...prevResumeInfo,
      projects: newProjects,
    }));
  };

  const removeTech = (projectIndex, techIndex) => {
    const newProjects = [...projectsList];
    if (
      newProjects[projectIndex].techStack &&
      newProjects[projectIndex].techStack.length > 1
    ) {
      newProjects[projectIndex].techStack.splice(techIndex, 1);
      setProjectsList(newProjects);

      // Update resumeInfo immediately
      setResumeInfo(prevResumeInfo => ({
        ...prevResumeInfo,
        projects: newProjects,
      }));
    }
  };

  const onSave = () => {
    setLoading(true);

    // Clean up projects data before saving
    const cleanProjects = projectsList.map((project) => {
      // eslint-disable-next-line no-unused-vars
      const { id, ...rest } = project;
      return {
        ...rest,
        techStack: rest.techStack?.filter((tech) => tech.trim() !== "") || [],
      };
    });

    const data = {
      data: {
        projects: cleanProjects,
      },
    };

    LocalStorageApi.UpdateResumeDetail(params.resumeId, data)
      .then((resp) => {
        setLoading(false);
        toast("Projects updated!");
        enabledNext && enabledNext(true);

        // Update the context with the saved data
        setResumeInfo(prevResumeInfo => ({
          ...prevResumeInfo,
          projects: cleanProjects,
        }));
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to save projects. Please try again.");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add your key projects and technical work</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projectsList}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {projectsList.map((project, index) => (
              <SortableProjectItem
                key={project.id}
                project={project}
                index={index}
                onProjectChange={handleProjectChange}
                onAddTech={addTech}
                onRemoveTech={removeTech}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addNewProject}
            className="text-primary"
          >
            + Add More Project
          </Button>
          <Button
            variant="outline"
            onClick={removeProject}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Projects;
