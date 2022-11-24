from django.contrib import admin
from .models import Tutors,CourseCategory,Course,Chapter,Assignments,EnrolledCourses,UserAssignment,Quiz,QuizQuestions,UserQuizAnswers,Certificate,PostCertificate,TotalMarks,Marks
# from .models import models

# Register your models here.
class TutorAdmin(admin.ModelAdmin):
    model=Tutors
    list_display=('id','full_name','email','qualification','mobile_no','skills')
    
    readonly_fields=('last_login','joined_date','password')
    ordering=('joined_date',)
    # filter_horizontal =()
    # list_filter = ()
    # fieldsets =()
class CourseCategoryAdmin(admin.ModelAdmin):
    model=Course
    list_display=('id','category','teacher','description','title','techs')
    
    
class chapterAdmin(admin.ModelAdmin):
    model=Chapter
    list_display=('id','course','title','no','description','video')
    
class AssignmentsAdmin(admin.ModelAdmin):
    model=Assignments
    list_display=('id','chapter','tutor','student','assignmentsPDF')

class UserAssignmentAdmin(admin.ModelAdmin):
    model=UserAssignment
    list_display=('id','userassignment','assignmentsname','studentname','tutorname','chaptername')
    
class QuizAdmin(admin.ModelAdmin):
    model=Quiz
    list_display=('id','teacher','course','title','add_time','detail','total_mark')    
    
    
class QuizQuestionsAdmin(admin.ModelAdmin):
    model=QuizQuestions
    list_display=('id','quiz','number','questions','ans1','ans2','ans3','ans4','right_ans','mark','add_time')  
    
class UserQuizAnswersAdmin(admin.ModelAdmin):
    model=UserQuizAnswers
    list_display=('id','QuizQuestions','question_no','studentname','answer')
    
class CertificateAdmin(admin.ModelAdmin):
    model=UserQuizAnswers
    list_display=('id','username','is_eligible','course')

class PostCertificateAdmin(admin.ModelAdmin):
    model=PostCertificate
    list_display=('id','certicate','usercertificate','success','course')
    
class MarksAdmin(admin.ModelAdmin):
    model=Marks
    list_display=('id','user','mark','Quiz','question_no')
    
class TotalMarksAdmin(admin.ModelAdmin):
    model=TotalMarks
    list_display=('id','user','totalmark','course')

admin.site.register(Tutors,TutorAdmin)
admin.site.register(CourseCategory)
admin.site.register(Course,CourseCategoryAdmin)
# admin.site.register(models.Student)
admin.site.register(Chapter,chapterAdmin)
admin.site.register(Assignments,AssignmentsAdmin)
admin.site.register(EnrolledCourses)
admin.site.register(UserAssignment,UserAssignmentAdmin)
admin.site.register(Quiz,QuizAdmin)
admin.site.register(QuizQuestions,QuizQuestionsAdmin)
admin.site.register(UserQuizAnswers,UserQuizAnswersAdmin)
admin.site.register(Certificate,CertificateAdmin)
admin.site.register(PostCertificate,PostCertificateAdmin)
admin.site.register(Marks,MarksAdmin)
admin.site.register(TotalMarks,TotalMarksAdmin)



