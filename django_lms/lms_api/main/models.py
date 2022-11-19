from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from datetime import datetime
from accounts.models import Account
# Create your models here.

# class TutorAccountManager(BaseUserManager):
#     def create_tutor(self,email,password=None):
#         if not email:
#             raise ValueError('please enter Email')
#         if not password:
#             raise ValueError('please Enter password')
#         tutor=self.model(
#             email=self.normalize_email(email),
#         )
#         tutor.is_active=True
#         tutor.is_staff=False
#         tutor.iis_varified=False
#         tutor.set_password(password)
#         tutor.save(using=self.db)
#         return tutor




class Tutors(AbstractBaseUser):
    full_name=models.CharField(max_length=255)
    email=models.EmailField(max_length=255)
    password=models.CharField(max_length=255)
    qualification=models.CharField(max_length=255)
    mobile_no=models.CharField(max_length=255)
    skills=models.TextField(max_length=250)
    
    
    joined_date     =models.DateTimeField(auto_now_add=True)
    last_login      =models.DateTimeField(auto_now=True)
    is_staff        =models.BooleanField(default=False)
    is_active       =models.BooleanField(default=False)
    is_verified     =models.BooleanField(default=False)
    # is_superuser   =models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name
    
    USERNAME_FIELD  ='email'
    REQUIRED_FIELDS =['password']
    
    # objects=TutorAccountManager()
    class Meta:
        verbose_name_plural='1.Tutotrs'
    
    def get_date(self):
        time = datetime.now()
        if self.joined_date.day == time.day:
            return str(time.hour - self.joined_date.hour) + " hours ago"
        else:
            if self.joined_date.month == time.month:
                return str(time.day - self.joined_date.day) + " days ago"
            else:
                if self.joined_date.year == time.year:
                    return str(time.month - self.joined_date.month) + " months ago"
        return self.joined_date


class CourseCategory(models.Model):
    title=models.CharField(max_length=255)
    description=models.TextField(null=True)
    
    class Meta:
        verbose_name_plural='2.Course Categories'
        
    def __str__(self):
        return self.title
    
class Course(models.Model):
    category=models.ForeignKey(CourseCategory,on_delete=models.CASCADE)
    teacher=models.ForeignKey(Tutors,on_delete=models.CASCADE)
    title=models.CharField(max_length=255)
    description=models.TextField(null=True)
    featured_img=models.ImageField(upload_to='course_imgs/',null=True,blank=True)
    techs=models.TextField(null=True)
    
    
    class Meta:
        verbose_name_plural='3.Courses'
    
    def __str__(self):
        return str(self.id)
    
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False)
    no = models.IntegerField()                
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos',null=True, blank=True)
    class Meta:
        verbose_name_plural ="4. chapters"
    def __str__(self):
        return str(self.id)
    
    
class Assignments(models.Model):
    chapter=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    tutor=models.ForeignKey(Tutors,on_delete=models.CASCADE)
    student=models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    assignmentsPDF=models.FileField(upload_to='tutor/assignments',null=True)
    
    class Meta:
        verbose_name_plural='5.Assignments'
        
    def __str__(self) -> str:
        return str(self.id)
        
    
        
class EnrolledCourses(models.Model):
    username=models.ForeignKey(Account,on_delete=models.CASCADE)
    tutors=models.ForeignKey(Tutors,on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    email=models.EmailField(null=True)
    
    prince=models.IntegerField(null=True)
    
    payment_status=models.BooleanField(default=False)
    order_status=models.BooleanField(default=False)
    




class UserAssignment(models.Model):
    userassignment=models.FileField(upload_to='user/assignments',null=False)
    assignmentsname=models.ForeignKey(Assignments,on_delete=models.CASCADE)
    studentname=models.ForeignKey(Account,on_delete=models.CASCADE)
    tutorname=models.ForeignKey(Tutors,on_delete=models.CASCADE)
    chaptername=models.ForeignKey(Chapter,on_delete=models.CASCADE)
    

    class Meta:
        verbose_name_plural='6.User Assignments'


# Quiz Models
class Quiz(models.Model):
    teacher=models.ForeignKey(Tutors,on_delete=models.CASCADE,null=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE,null=True)
    title=models.CharField(max_length=150)
    detail=models.TextField(max_length=150)
    total_mark=models.IntegerField(null=True,default=100)
    add_time=models.DateTimeField(auto_now_add=True)
    

    class Meta:
        verbose_name_plural="7.Quiz" 
      
    def __str__(self) -> str:
            return str(self.id)  
        
class QuizQuestions(models.Model):
    quiz=models.ForeignKey(Quiz,on_delete=models.CASCADE,null=True)
    number=models.IntegerField()
    questions=models.CharField(max_length=200)
    ans1=models.CharField(max_length=200)
    ans2=models.CharField(max_length=200)
    ans3=models.CharField(max_length=200)
    ans4=models.CharField(max_length=200)
    right_ans=models.CharField(max_length=200)
    mark=models.IntegerField()
    add_time=models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name_plural="8.Quiz Questions" 
        
    def __str__(self):
        return str(self.id)
        
class UserQuizAnswers(models.Model):
    QuizQuestions=models.ForeignKey(QuizQuestions,on_delete=models.CASCADE,null=True)
    studentname=models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    question_no=models.IntegerField()
    answer=models.CharField(max_length=200)
   
    class Meta:
        verbose_name_plural="9.User Quiz Answer Sheet" 
        
    def __str__(self):
        return str(self.id)
        
        
class Certificate(models.Model):
    username =models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    is_eligible=models.BooleanField(default=True)
    course=models.CharField(max_length=255,null=True)
   
    
    class Meta:
        verbose_name_plural="10.Certificate" 
    def __str__(self):
        return str(self.username)
        
class PostCertificate(models.Model):
    certicate=models.ForeignKey(Certificate,on_delete=models.CASCADE,null=True)
    usercertificate=models.FileField(upload_to='user/certificate',null=False)
    success=models.BooleanField(default=True)
    course=models.IntegerField(null=True)
    
    
    class Meta:
        verbose_name_plural="11.postCertificate" 
        
    def __str__(self):
        return str(self.certicate)