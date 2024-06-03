from tortoise import Model, fields
from .dataclasses import UrlType
from schemas.link import LinkSchema


class Link(Model):
    id = fields.IntField(pk=True)

    work = fields.ForeignKeyField(
        'models.Work',
        related_name='url',
        null=True
    )

    type = fields.CharField(max_length=32, default=UrlType.url, validators=[UrlType.validator])
    title = fields.CharField(max_length=32, null=True)
    url = fields.CharField(max_length=255, null=False)


    async def to_schema(self) -> LinkSchema:
        '''### Make tortoise model to pydantic LinkSchema'''
        return LinkSchema(
            id=self.id,
            type=self.type,
            title=self.type,
            url=self.url,
        )
