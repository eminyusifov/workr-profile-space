
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Globe, Monitor, MapPin } from "lucide-react";

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

interface ProfileConfigCardsProps {
  userSkills: string[];
  userStatus: string;
  userTools: string[];
  workspacePreferences: WorkspacePreferences;
  userLanguages: Language[];
  onSkillsClick: () => void;
  onStatusClick: () => void;
  onToolsClick: () => void;
  onWorkspaceClick: () => void;
  onLanguageClick: () => void;
}

const ProfileConfigCards = ({
  userSkills,
  userStatus,
  userTools,
  workspacePreferences,
  userLanguages,
  onSkillsClick,
  onStatusClick,
  onToolsClick,
  onWorkspaceClick,
  onLanguageClick
}: ProfileConfigCardsProps) => {
  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Skills Configuration */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onSkillsClick}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Settings className="h-4 w-4 text-blue-600" />
              <span>Skills & Expertise</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {userSkills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {userSkills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{userSkills.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Configuration */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onStatusClick}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${userStatus === 'available' ? 'bg-green-500' : userStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'}`} />
              <span>Availability Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm capitalize font-medium">{userStatus}</p>
            <p className="text-xs text-gray-600">Click to update status</p>
          </CardContent>
        </Card>

        {/* Tools Configuration */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onToolsClick}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Monitor className="h-4 w-4 text-blue-600" />
              <span>Tools & Software</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {userTools.slice(0, 2).map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
              {userTools.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{userTools.length - 2} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Workspace Configuration */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onWorkspaceClick}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>Workspace Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium capitalize">{workspacePreferences.workArrangement}</p>
            <p className="text-xs text-gray-600">{workspacePreferences.timeZone}</p>
          </CardContent>
        </Card>

        {/* Language Configuration */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onLanguageClick}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-blue-600" />
              <span>Languages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {userLanguages.slice(0, 2).map((lang) => (
                <Badge key={lang.language} variant={lang.isPrimary ? "default" : "secondary"} className="text-xs">
                  {lang.language}
                </Badge>
              ))}
              {userLanguages.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{userLanguages.length - 2} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Optimization */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Profile Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-green-600">85% Complete</p>
            <p className="text-xs text-gray-600">Add portfolio items to improve</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ProfileConfigCards;
