from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
        class Meta:
            model = models.Tutors
            fields = ['id','full_name','email', 'password', 'qualification','mobile_no','skills',]
        
        def get_name(self,obj):
            name=obj.full_name
            return name
        
        def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
        
        # Adding the below line made it work for me.
            instance.is_active = True
            if password is not None:
                # Set password does the hash, so you don't need to call make_password 
                instance.set_password(password)
            instance.save()
            return instance
            
class CategorySerializer(serializers.ModelSerializer):
        class Meta:
            model = models.CourseCategory
            fields = ['id','title','description']
            
#couse       
class CourseSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(many=False)
    # teacher = TeacherSerializer(many=False)
   
    class Meta:
            model = models.Course
            fields = '__all__'
            # depth=1
            
#specific techer course

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter
        fields=['id','course','no','video','title','description']
        # depth=1
        
class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Assignments
        fields=['id','chapter','tutor','assignmentsPDF']
        depth=1  #get details of all foriegn key
        
        
class userAssignmentSerailizer(serializers.ModelSerializer):
    class Meta:
        model=models.UserAssignment
        fields=['id','userassignment','assignmentsname','studentname','tutorname','chaptername']
        
        
class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id','course','teacher','title','detail','add_time']
        
        
        
        
class QuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.QuizQuestions
        fields = ['id','quiz','number','questions','ans1','ans2','ans3','ans4','right_ans','mark']
        extra_kwargs = {
            'right_ans' : {'write_only' : True}
        }
        
class QuizAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.UserQuizAnswers
        fields = ['id','QuizQuestions','question_no','studentname','answer']
    
class PostCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.PostCertificate
        fields = ['id','certicate','usercertificate','success','course']
        depth=1
        
class teachercheckcertificateserializers(serializers.ModelSerializer):
    class Meta:
        model=models.Certificate
        fields = ['id','username','is_eligible','course']
        