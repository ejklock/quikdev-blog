import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEmailIsUnique } from 'src/domains/user/validators/email-unique';
export default class RegisterDto {
  @IsNotEmpty()
  name: string;

  @UserEmailIsUnique()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
