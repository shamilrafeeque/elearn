from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    path('token/',views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',views.RegisterView.as_view(),name='register'),
    path('verifyloginuserotp',views.VerifyUserOtp.as_view(),name='verifyloginuserotp'),
    path('user_details/<int:pk>/', views.AccountDetail.as_view()),
    
    #homepage
    path('userhome/',views.Allcourse,name='Allusers'),
    path('usersingleCouse/<int:id>/',views.SingleCourse,name="singleCourse"),
    path('chapterlist/<int:id>/',views.ChapterList,name="ChapterList"),
    path('chapterlistbasedCourse/<int:id>/',views.AllChapter,name="allChapter"),
    path('Assignmentsafterpay/<int:id>/',views.AfterpayAssignment,name="assignments"),
    path('usesrpostassignment/',views.UserPostAssignment,name='UserPostAssignment'),
    path('userparchaseCouse/',views.userParchaseCourse,name="userParchaseCourse"),
    #usergetquiz
    path('usergetQuiz/<int:id>/',views.UsergetQuiz,name='UserGtQuiz'),
    path('usergetQustion/<int:id>/',views.usergetQustion,name='usergetQustion'),
    path('userPostAnswer/<int:id>/',views.userPostAnswer,name='userPostAnswer'),
    # path('totlmarks/',views.totlmarks,name='totlmarks'),
    path('applycertificate/<int:id>/',views.ApplyCertificate,name="applycertificate"),
    
    #getcertificate
    path('getcertificate/<int:id>/',views.GetCertificate,name="GetCertificate"),
    
    #adminpanel
    path('allusers/',views.getAllUsers,name="getallusers"),
    path('admin_panel/users/block/<int:id>/',views.BlockUSer.as_view()),
    path('admin_panel/tutoes/block/<int:id>/',views.BlockTutor.as_view()),
    path('getAllTutors/',views.getAllTutors,name="getAllTutors"),
    path('getAllCourse/',views.AllCourseList.as_view(),name="AllCourseList"),
    path('getAllChapter/',views.AllChapterlist.as_view(),name="AllChapterlist"),
    path('getAllAssignments/',views.AllAssignments.as_view(),name="AllAssignments"),   
    path('getenrolledStudent/',views.enrolledStudent.as_view(),name="enrolledStudent"),   
    path('totalofamount/',views.getTotalamount.as_view(),name="getTotalamount"),
    path('adminpercentage/',views.adminPercentage.as_view(),name="adminPercentage"),
    path('TeacherAmount/',views.TeacherAmount.as_view(),name="TeacherAmount")
    
    
   

    ]


urlpatterns = format_suffix_patterns(urlpatterns)