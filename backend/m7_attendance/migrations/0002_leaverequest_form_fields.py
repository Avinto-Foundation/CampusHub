from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m7_attendance', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaverequest',
            name='roll_number',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='email',
            field=models.EmailField(default='student@campus.edu', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='subject',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='leave_type',
            field=models.CharField(choices=[('medical', 'Medical'), ('family', 'Family'), ('event', 'College event'), ('other', 'Other')], default='other', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='days',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='leaverequest',
            name='informed_teacher',
            field=models.BooleanField(default=False),
        ),
    ]
