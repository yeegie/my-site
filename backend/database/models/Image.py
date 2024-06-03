from tortoise import Model, fields
from schemas.image import ImageSchema


class Image(Model):
    id = fields.IntField(pk=True)

    work = fields.ForeignKeyField(
        'models.Work',
        related_name='image',
        null=True,
    )

    file_name = fields.CharField(max_length=255)
    full_path = fields.CharField(max_length=255)


    async def to_schema(self) -> ImageSchema:
        '''### Make tortoise model to pydantic ImageSchema'''
        return ImageSchema(
            id=self.id,
            file_name=self.file_name,
            full_path=self.full_path,
        )
