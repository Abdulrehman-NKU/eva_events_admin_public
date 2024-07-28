import React from 'react';
import { Title, Text } from '@/components/ui/text';

interface roles {
  _id: string;
  role_name: string;
  role_description: string;
  status: string;
  permissions: any[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminRole = ({ roles }: { roles: roles[] }) => {
  return (
    <>{roles?.map((role) => <Text key={role._id}>{role?.role_name}</Text>)}</>
  );
};

export default AdminRole;
