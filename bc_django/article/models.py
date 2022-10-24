from django.db import models
from user.models import *
from car.models import *

class Article(models.Model):
    user = models.ForeignKey('user.CustomUser', models.DO_NOTHING)
    article_category = models.ForeignKey('ArticleCategory', models.DO_NOTHING)
    title = models.CharField(max_length=45)
    text = models.TextField()
    published = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'article'
        unique_together = (('id', 'user'),)

    def __str__(self):
        return self.title


class ArticleCategory(models.Model):
    category_name = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'article_category'

    def __str__(self):
        return self.category_name
