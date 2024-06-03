from tortoise.exceptions import ValidationError


class UrlType:
    github = 'github'
    url = 'url'

    __all_values = [github, url]

    @classmethod
    def validator(bob, value: str):
        if value not in bob.__all_values:
            raise ValidationError(f'{bob.__name__}: [{value}] not in {bob.__all_values}')

class UserType:
    user = 'user'
    admin = 'admin'

    __all_values = [user, admin]

    @classmethod
    def validator(cls, value: str):
        if value not in cls.__all_values:
            raise ValidationError(f'{cls.__name__}: [{value}] not in {cls.__all_values}')
