from tortoise import Model, fields
from schemas.stack import StackSchema


class Stack(Model):
    id = fields.IntField(pk=True)

    work = fields.ForeignKeyField(
        'models.Work',
        related_name='stack',
        null=True,
    )

    title = fields.CharField(max_length=16)
    gradient = fields.CharField(max_length=64, null=True)  # "['#FFFFFF', '#333333']"


    async def to_schema(self) -> StackSchema:
        '''### Make tortoise model to pydantic StackSchema'''
        return StackSchema(
            id=self.id,
            title=self.title,
            gradient=self.gradient,
        )
