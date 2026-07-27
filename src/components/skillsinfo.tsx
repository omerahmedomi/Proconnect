"use client";
import { useState, useEffect } from "react";
import PlusIcon from "./icons/addicon";
import EditIcon from "./icons/editicon";
import Modal from "./modal";
import { X, Loader } from "lucide-react";
import { updateSkills } from "@/app/actions/profile";
import { useRouter } from "next/navigation";

export default function SkillsInfo({ self, skills = [] }: { self: boolean, skills?: string[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      // Don't forcefully unset here on unmount to avoid breaking other modals
    };
  }, [isModalOpen]);

  return (
    <div className="profile-div p-6">
      <div className="flex justify-between mb-4">
        <h4 className="font-semibold text-lg">Skills</h4>
        {self && (
          <div>
            <button onClick={() => setIsModalOpen(true)}>
              <EditIcon />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            {skill}
          </span>
        ))}
        {skills.length === 0 && (
          <span className="text-gray-500 text-sm">No skills added yet.</span>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title="Manage Skills"
          content={<ManageSkillsContent initialSkills={skills} close={() => setIsModalOpen(false)} />}
          clearFunction={() => setIsModalOpen(false)}
          styles="profile-modal-styles"
        />
      )}
      
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-45 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

function ManageSkillsContent({ initialSkills, close }: { initialSkills: string[], close: () => void }) {
  const [currentSkills, setCurrentSkills] = useState<string[]>([...initialSkills]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      setCurrentSkills([...currentSkills, trimmed]);
      setInputValue("");
    }
  };

  const handleRemove = (skillToRemove: string) => {
    setCurrentSkills(currentSkills.filter(s => s !== skillToRemove));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await updateSkills(currentSkills);
    setIsLoading(false);
    router.refresh();
    close();
  };

  return (
    <div className="w-full space-y-4 px-2 flex flex-col">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          className="border rounded-md px-3 py-2 flex-grow outline-none focus:ring-1 focus:ring-cyan-500"
          placeholder="Add a skill (e.g. React, Node.js)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto py-2">
        {currentSkills.map((skill, i) => (
          <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200">
            {skill}
            <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => handleRemove(skill)} />
          </span>
        ))}
        {currentSkills.length === 0 && (
          <span className="text-gray-500 text-sm">No skills added yet.</span>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 transition disabled:bg-gray-400"
        >
          {isLoading ? <Loader size={20} className="animate-spin mx-auto" /> : "Save"}
        </button>
      </div>
    </div>
  );
}