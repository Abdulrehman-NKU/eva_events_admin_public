import { Badge } from '@/components/ui/badge';
import { Title, Text } from '@/components/ui/text';

const StatusBadge = ({status}: {status:string}) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center capitalize">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center capitalize">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    case 'active':
      return (
        <div className="flex items-center capitalize">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    case 'binned':
      return (
        <div className="flex items-center capitalize">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );

    default:
      return (
        <div className="flex items-center capitalize">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
};

export default StatusBadge;
