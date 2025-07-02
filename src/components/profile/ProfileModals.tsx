
import EditProfileModal from "@/components/profile/EditProfileModal";
import SkillsConfigModal from "@/components/profile/SkillsConfigModal";
import StatusConfigModal from "@/components/profile/StatusConfigModal";
import ToolsConfigModal from "@/components/profile/ToolsConfigModal";
import WorkspaceConfigModal from "@/components/profile/WorkspaceConfigModal";
import LanguageConfigModal from "@/components/profile/LanguageConfigModal";

interface User {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  verified: boolean;
  joinedDate: string;
  stats: {
    profileViews: number;
    favorites: number;
    projects: number;
    rating: number;
    reviews: number;
  };
  skills: string[];
}

interface Language {
  language: string;
  level: string;
  isPrimary?: boolean;
}

interface WorkspacePreferences {
  workArrangement: string;
  serviceAreas: string[];
  timeZone: string;
  workingHours: string;
}

interface ProfileModalsProps {
  isContractor: boolean;
  user: User;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (open: boolean) => void;
  isSkillsModalOpen: boolean;
  setIsSkillsModalOpen: (open: boolean) => void;
  isStatusModalOpen: boolean;
  setIsStatusModalOpen: (open: boolean) => void;
  isToolsModalOpen: boolean;
  setIsToolsModalOpen: (open: boolean) => void;
  isWorkspaceModalOpen: boolean;
  setIsWorkspaceModalOpen: (open: boolean) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  userSkills: string[];
  userStatus: string;
  userTools: string[];
  workspacePreferences: WorkspacePreferences;
  userLanguages: Language[];
  onSkillsSave: (skills: string[], certifications: string[]) => void;
  onStatusSave: (status: string, message: string, autoUpdate: boolean, availableUntil?: Date) => void;
  onToolsSave: (tools: string[], equipment: string[], licenses: string[]) => void;
  onWorkspaceSave: (preferences: any) => void;
  onLanguageSave: (languages: any[], communicationPreference: string) => void;
}

const ProfileModals = ({
  isContractor,
  user,
  isEditProfileOpen,
  setIsEditProfileOpen,
  isSkillsModalOpen,
  setIsSkillsModalOpen,
  isStatusModalOpen,
  setIsStatusModalOpen,
  isToolsModalOpen,
  setIsToolsModalOpen,
  isWorkspaceModalOpen,
  setIsWorkspaceModalOpen,
  isLanguageModalOpen,
  setIsLanguageModalOpen,
  userSkills,
  userStatus,
  userTools,
  workspacePreferences,
  userLanguages,
  onSkillsSave,
  onStatusSave,
  onToolsSave,
  onWorkspaceSave,
  onLanguageSave
}: ProfileModalsProps) => {
  return (
    <>
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
      />

      {isContractor && (
        <>
          <SkillsConfigModal
            isOpen={isSkillsModalOpen}
            onClose={() => setIsSkillsModalOpen(false)}
            currentSkills={userSkills}
            onSave={onSkillsSave}
          />

          <StatusConfigModal
            isOpen={isStatusModalOpen}
            onClose={() => setIsStatusModalOpen(false)}
            currentStatus={userStatus}
            onSave={onStatusSave}
          />

          <ToolsConfigModal
            isOpen={isToolsModalOpen}
            onClose={() => setIsToolsModalOpen(false)}
            currentTools={userTools}
            onSave={onToolsSave}
          />

          <WorkspaceConfigModal
            isOpen={isWorkspaceModalOpen}
            onClose={() => setIsWorkspaceModalOpen(false)}
            currentPreferences={workspacePreferences}
            onSave={onWorkspaceSave}
          />

          <LanguageConfigModal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            currentLanguages={userLanguages}
            onSave={onLanguageSave}
          />
        </>
      )}
    </>
  );
};

export default ProfileModals;
