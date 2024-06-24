import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/domains/auth/decorators/match.decorator';
import { UserEmailIsUnique } from 'src/domains/user/validators/email-unique';
export default class RegisterDto {
  @IsNotEmpty()
  name: string;

  @UserEmailIsUnique()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @Match('password')
  passwordConfirmation: string;
}
