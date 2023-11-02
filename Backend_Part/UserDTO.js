import { IsBoolean, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Transform } from 'class-transformer';

class UserDTO {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @Transform((value) => value === 18)
  @IsBoolean()
  isActive: boolean;
}

// In your route handler, you can use the DTO and validate it like this:
app.post('/create-user', (req, res) => {
  const userDto = new UserDTO();
  userDto.name = req.body.name;
  userDto.age = req.body.age;
  userDto.isActive = req.body.age > 18;

  validate(userDto).then((errors) => {
    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      // Save user to the database
      // ...
      res.status(201).json(userDto);
    }
  });
});
