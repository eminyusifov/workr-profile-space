
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase } from "lucide-react";
import { useUserType } from "@/contexts/UserTypeContext";

const UserTypeSelector = () => {
  const { setUserType } = useUserType();

  const handleSelection = (type: 'customer' | 'contractor') => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Workr</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose how you'd like to use our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                I'm a Customer
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Looking to hire talented professionals for my projects
              </p>
              
              <div className="space-y-2 mb-6">
                <Badge variant="outline" className="mr-2">Browse Contractors</Badge>
                <Badge variant="outline" className="mr-2">Post Jobs</Badge>
                <Badge variant="outline" className="mr-2">Manage Projects</Badge>
                <Badge variant="outline">Message Contractors</Badge>
              </div>
              
              <Button 
                onClick={() => handleSelection('customer')}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Continue as Customer
              </Button>
            </CardContent>
          </Card>

          {/* Contractor Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                I'm a Contractor
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ready to showcase my skills and find amazing projects
              </p>
              
              <div className="space-y-2 mb-6">
                <Badge variant="outline" className="mr-2">Build Portfolio</Badge>
                <Badge variant="outline" className="mr-2">Find Jobs</Badge>
                <Badge variant="outline" className="mr-2">Manage Profile</Badge>
                <Badge variant="outline">Connect with Clients</Badge>
              </div>
              
              <Button 
                onClick={() => handleSelection('contractor')}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Continue as Contractor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
