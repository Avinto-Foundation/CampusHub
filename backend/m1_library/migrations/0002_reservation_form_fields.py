from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('m1_library', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='email',
            field=models.EmailField(default='student@campus.edu', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='roll_number',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='phone',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='loan_days',
            field=models.PositiveIntegerField(choices=[(7, '7 days'), (14, '14 days'), (21, '21 days')], default=14),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='pickup_location',
            field=models.CharField(choices=[('main', 'Main Library'), ('engineering', 'Engineering Library'), ('hostel', 'Hostel Reading Room')], default='main', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='due_date_reminder',
            field=models.BooleanField(default=False),
        ),
    ]
