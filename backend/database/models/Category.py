from tortoise import Model, fields
from schemas.category import CategorySchema


class Category(Model):
    id = fields.IntField(pk=True)

    work = fields.ForeignKeyField(
        'models.Work',
        related_name='category',
        null=True,
    )

    title = fields.CharField(max_length=32, none=False)
    # plural_title = fields.CharField(max_length=32, none=True)
    description = fields.CharField(max_length=64, none=True)

    is_active = fields.BooleanField(default=False)


    async def to_schema(self) -> CategorySchema:
        '''### Make tortoise model to pydantic CategorySchema'''
        return CategorySchema(
            id=self.id,
            title=self.title,
            description=self.description,
            is_active=self.is_active,
        )
