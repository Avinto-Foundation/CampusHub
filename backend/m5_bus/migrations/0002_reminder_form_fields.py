from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m5_bus', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='departure',
            field=models.CharField(default='', max_length=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='student_name',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='phone',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='minutes_before',
            field=models.PositiveIntegerField(choices=[(5, '5 minutes'), (10, '10 minutes'), (15, '15 minutes'), (30, '30 minutes')], default=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='channel',
            field=models.CharField(choices=[('email', 'Email'), ('sms', 'SMS')], default='email', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reminder',
            name='repeat_weekdays',
            field=models.BooleanField(default=False),
        ),
    ]
