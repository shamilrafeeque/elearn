# from django.urls import path
# from . import views


# urlpatterns = [
#     # path('teacher/', views.TeacherList.as_view()),
#     # path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
#     # path('teacherlogin/',views.teacher_login),
#     # path('admin/',views.AdminLogin.as_view()),
# ]

from . import views
from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    
    
    path('Tutorregister/',views.TutorRegisterView.as_view(),name='tutorregister'),
    path('login-Tutor/',views.LoginAPIViews.as_view(),name='tutorlogin'),
    #admin tutor list
    path('Tutor/',views.AllTutorAPIView.as_view(),name='tutor'),
    #Category///
    path('category/',views.CategoryList.as_view()),
    #teacher courses#course list
    path('addcourse/',views.addCourse,name="asscourse"),
    path('updatecourse/<int:id>',views.UpdateCourselist,name="updatacourse"),
    path('deletecourse/<int:id>',views.deleteCourse,name="deletCouse"),
    path('courseList/<int:id>',views.CourseList.as_view()),
    #chapter
    path('chapter_list/',views.ChapterList.as_view()),
    path('addChapter/',views.addChapter,name="addChapter"),
    path('UpdateChapter/<int:id>',views.UpdateChapterlist,name="addChapter"),
    path('deleteChapter/<int:id>',views.deleteChapter,name="deleteChapter"),
    #asssignments
    path('addassignments/',views.addAssignments,name="assAssignments"),
    path('updateAssignments/<int:id>/',views.UpdateAssignments,name="UpdateAssignments"),
    path('deleteAssignments/<int:id>/',views.deleteAssignments,name="deleteAssignments"),
    path('getAssignments/<int:id>/',views.getAssignments,name="getAssignments"),
    path('allAssignments/<int:id>/',views.allAssignments,name="allAssignments"),
    
    
    #quiz section
    path('add_quiz/<int:id>/',views.addQuiz,name="addQuiz"),
    path('assign_quiz/<int:id>/',views.assignQuiz,name="assignQuiz"),
    
    #postcertifiacte
    path('postcertificate/<int:id>/',views.Postcertificate,name="PostCertificate"),

]