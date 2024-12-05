"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/entity/auth-entity";
import { useSessionUpdate } from "@/hooks/use-session-update";
import { toast } from "@/hooks/use-toast";
import { profileService } from "@/service/profile";
import { useEffect, useState } from "react";

const ProfileDetail = () => {
  const { updateSession } = useSessionUpdate();
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const { getProfile, switchRole } = profileService;

  const fetchProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };

  const handleRoleChange = async (roleId: string) => {
    if (profile) {
      try {
        await switchRole(Number(roleId));
        const user = await getProfile();
        await updateSession({
          activeRoleId: Number(user.active_role_id),
          permissions:
            user.active_role.permissions?.map((p: any) => p.name) || [],
        });
        toast({
          title: "Role berhasil diubah ke " + user.active_role.name,
          variant: "default",
        });
      } catch (error) {
        console.error("Failed to switch role", error);
        toast({
          title: "Gagal mengubah role",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold">Nama</label>
          <p className="text-lg">{profile.name}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <p className="text-lg">{profile.email}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold">Active Role</label>
          <Select
            defaultValue={String(profile.active_role_id)}
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {profile.roles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
