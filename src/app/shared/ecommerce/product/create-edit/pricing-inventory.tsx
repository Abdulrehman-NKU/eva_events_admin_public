import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import ProductAvailability from '@/app/shared/ecommerce/product/create-edit/product-availability';
import InventoryTracing from '@/app/shared/ecommerce/product/create-edit/inventory-tracking';
import ProductPricing from '@/app/shared/ecommerce/product/create-edit/product-pricing';

interface PricingInventoryProps {
  className?: string;
}

export default function PricingInventory({ className }: PricingInventoryProps) {
  return (
    <>
      <FormGroup
        title="Venue Address"
        description="Add the venue address here"
        className={cn(className)}
      >
        <ProductPricing />
      </FormGroup>
      {/* <FormGroup
        title="Add Delegates"
        description="Assign delegates to the event"
        className={cn(className)}
      >
        <InventoryTracing />
      </FormGroup>
      <FormGroup
        title="Availability"
        description="Add your product inventory info here"
        className={cn(className)}
      >
        <ProductAvailability />
      </FormGroup> */}
    </>
  );
}
