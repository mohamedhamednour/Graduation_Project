# Generated by Django 3.2.9 on 2021-12-12 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instgram', '0002_alter_profile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Col',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('addtest', models.CharField(max_length=1000)),
            ],
        ),
    ]
