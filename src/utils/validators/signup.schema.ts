import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  phoneNumber: z.string().min(5, { message: messages.phoneNumberIsRequired }),
  email: validateEmail,
  selectRole:z.string().optional(),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  isAgreed: z.boolean(),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
