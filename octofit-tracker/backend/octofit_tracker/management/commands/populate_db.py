from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
from django.utils import timezone


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting database population...')

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Existing data cleared'))

        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes united to fight for justice'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='The Justice League protecting the world from threats'
        )
        self.stdout.write(self.style.SUCCESS('Teams created'))

        # Create Users (Superheroes)
        self.stdout.write('Creating users...')
        marvel_users = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com', 'team': 'Team Marvel'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com', 'team': 'Team Marvel'},
        ]

        dc_users = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com', 'team': 'Team DC'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com', 'team': 'Team DC'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com', 'team': 'Team DC'},
            {'name': 'The Flash', 'email': 'barry.allen@dc.com', 'team': 'Team DC'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com', 'team': 'Team DC'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com', 'team': 'Team DC'},
        ]

        for user_data in marvel_users + dc_users:
            User.objects.create(**user_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(marvel_users + dc_users)} users'))

        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Weightlifting', 'Combat Training', 'Flying', 'Swimming', 'Cycling']
        activities_created = 0
        
        all_users = User.objects.all()
        base_date = timezone.now() - timedelta(days=30)
        
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = 7
            for i in range(num_activities):
                activity_type = activity_types[i % len(activity_types)]
                duration = 30 + (i * 10)
                calories = duration * 8  # Approximate calories
                activity_date = base_date + timedelta(days=i * 4)
                
                Activity.objects.create(
                    user_email=user.email,
                    activity_type=activity_type,
                    duration=duration,
                    calories=calories,
                    date=activity_date,
                    notes=f'{user.name} completed {activity_type}'
                )
                activities_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities'))

        # Create Leaderboard
        self.stdout.write('Creating leaderboard...')
        leaderboard_data = []
        
        for user in all_users:
            user_activities = Activity.objects.filter(user_email=user.email)
            total_calories = sum(activity.calories for activity in user_activities)
            total_activities = user_activities.count()
            
            leaderboard_data.append({
                'user_email': user.email,
                'user_name': user.name,
                'team': user.team,
                'total_calories': total_calories,
                'total_activities': total_activities,
            })
        
        # Sort by total calories and assign ranks
        leaderboard_data.sort(key=lambda x: x['total_calories'], reverse=True)
        for rank, data in enumerate(leaderboard_data, start=1):
            data['rank'] = rank
            Leaderboard.objects.create(**data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_data)} leaderboard entries'))

        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            {
                'name': 'Hero Sprint Training',
                'description': 'High-intensity interval running to build speed and endurance like The Flash',
                'difficulty': 'Hard',
                'duration': 30,
                'calories_estimate': 400,
                'exercise_type': 'Cardio'
            },
            {
                'name': 'Iron Armor Strength',
                'description': 'Heavy weightlifting routine inspired by Iron Man\'s power suit',
                'difficulty': 'Hard',
                'duration': 45,
                'calories_estimate': 350,
                'exercise_type': 'Strength'
            },
            {
                'name': 'Amazonian Warrior Circuit',
                'description': 'Full-body circuit training like Wonder Woman',
                'difficulty': 'Medium',
                'duration': 40,
                'calories_estimate': 450,
                'exercise_type': 'Circuit'
            },
            {
                'name': 'Web-Slinger Agility',
                'description': 'Agility and flexibility training inspired by Spider-Man',
                'difficulty': 'Medium',
                'duration': 35,
                'calories_estimate': 300,
                'exercise_type': 'Agility'
            },
            {
                'name': 'Asgardian Power Lift',
                'description': 'Maximum strength training worthy of Thor\'s hammer',
                'difficulty': 'Hard',
                'duration': 50,
                'calories_estimate': 380,
                'exercise_type': 'Strength'
            },
            {
                'name': 'Atlantean Swim Session',
                'description': 'Swimming workout to build endurance like Aquaman',
                'difficulty': 'Medium',
                'duration': 45,
                'calories_estimate': 420,
                'exercise_type': 'Cardio'
            },
            {
                'name': 'Dark Knight Combat',
                'description': 'Combat and martial arts training inspired by Batman',
                'difficulty': 'Hard',
                'duration': 60,
                'calories_estimate': 500,
                'exercise_type': 'Combat'
            },
            {
                'name': 'Super Soldier Basics',
                'description': 'Foundational fitness routine based on Captain America\'s training',
                'difficulty': 'Easy',
                'duration': 25,
                'calories_estimate': 250,
                'exercise_type': 'General'
            },
        ]

        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        # Summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
        self.stdout.write(self.style.SUCCESS('===================================\n'))
