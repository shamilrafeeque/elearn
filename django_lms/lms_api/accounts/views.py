
# from accounts.serializers import MyTokenObtainPairSerializer
from urllib import request
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AccountSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
#for admin 
from rest_framework.decorators import api_view,authentication_classes
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import Account,Marks,TotalMarks
from .serializers import AccountSerializer,VerifyOtpSerializer,RecomentedCourseSerializer
from django.shortcuts import get_object_or_404
from django.http import Http404
from main.models import Tutors,Course,Chapter,Assignments,UserAssignment,Quiz,QuizQuestions,UserQuizAnswers,Certificate,PostCertificate
from payments.sereializers import OrderSerializer
from main.serializers import CourseSerializer,ChapterSerializer,TeacherSerializer,AssignmentSerializer,userAssignmentSerailizer,QuizSerializer,QuizQuestionSerializer,QuizAnswerSerializer,PostCertificateSerializer
from django.http import JsonResponse
from .verify import send,check
from payments.models import Order
from payments.models import AdminPercentage
from django.db.models import Q


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        print(user)
        print('4444444444444444444444444')
        token = super().get_token(user)
        print('**********************************9999999999999999')
        print(user.email)
        print(token)

        # Add custom claims
       
       
       
        token['is_superuser'] = user.is_superuser
        token['email'] = user.email
        token['is_active'] = user.is_active
        
      

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    print('77777777777777777777777777')
    serializer_class = MyTokenObtainPairSerializer
    
    
from rest_framework.views import APIView
class RegisterView(APIView):
    def post(self,request):
        data = request.data
        print(data,'kkkkkkkkkkkkkkkkkkkkkkkkkkk')
        serializer = AccountSerializer(data=data)
        
        if serializer.is_valid():
                serializer.save()
                print("@@@@@*************************")
                print(serializer.data)
                phone_number=data['mobile']
                print(phone_number,'oooooooooooooooooooooooooo')
                send(phone_number)
                

                response={
                    "messages" : "User Created Successfully",
                    "data" : serializer.data
                }
                
                return Response(data= response, status = status.HTTP_201_CREATED)
            
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class VerifyUserOtp(APIView):
    def post(self,request):
        try:
            data=request.data
            phone_number=data['mobile']
            code=data['code']
            if check(phone_number,code):
                print('hello')
                user = Account.objects.get(mobile=phone_number)   
                print(user,'jjjjjjjjjjjjjjjjjjjjjjjjjj')       
                user.is_active= True
                user.save()
                serializer = VerifyOtpSerializer(user, many=False)
                return Response(serializer.data)
            else:
                message = {'detail':'otp is not valid'}
                
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthin whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @authentication_classes=([jw])
def getAllUsers(request):
    users = Account.objects.filter(is_staff=False,is_superuser=False).order_by('id')
    serializer = AccountSerializer(users,many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getAllTutors(request):
    tutor = Tutors.objects.filter(is_staff=False).order_by('id')
    serializer = TeacherSerializer(tutor,many=True)
    return Response(serializer.data)

class AllCourseList(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, format=None):
        users = Course.objects.all()
        serializer = CourseSerializer(users, many=True)
        return Response(serializer.data)
    

class AllAssignments(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, format=None):
        users = Assignments.objects.all()
        serializer = AssignmentSerializer(users, many=True)
        return Response(serializer.data)

class AllChapterlist(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, format=None):
        users = Chapter.objects.all()
        serializer = ChapterSerializer(users, many=True)
        return Response(serializer.data)

class enrolledStudent(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, format=None):
        users = Order.objects.filter(isPaid=True)
        serializer = OrderSerializer(users, many=True)
        return Response(serializer.data)


class getTotalamount(APIView):
    permission_classes=[IsAdminUser]
    
    def get(self,request):
        amount=Order.objects.filter(isPaid=True)
        print(amount)
        j=0
        for i in amount:
            
            print(type(j))
            s=i.order_amount
            kk=int(s)
            print(type(kk))
            j=kk+j
            print(j)
        print(j)
        return Response(data={"total income":j})


class adminPercentage(APIView):
    permission_classes=[IsAdminUser]
    def get(self,request):
        
        amount=Order.objects.filter(isPaid=True)
        print(amount)
        j=0
        for i in amount:
            
            print(type(j))
            s=i.order_amount
            kk=int(s)
            print(type(kk))
            j=kk+j
            print(j)
            adminperctage=(j*12)/100
            print(adminperctage)
            # AdminPercentage.objects.create(
            #     Totalamount = j,
            #     percentage=12,
            #     adminPercentageamount= adminperctage,
                
            # )
        return Response(data={"Total  Amount":j,"percentage":12,"admin Percentage amount":adminperctage})
        
        
class TeacherAmount(APIView):
    permission_classes=[IsAdminUser]
    def get(self,request):
        if Order.objects.filter(isPaid=True):
            teacher=Order.objects.all()
            print(teacher.values())
            s=teacher.values_list('order_course_id')
            print('llllllllllllllllll')
            print(s)
            li=[]
            for i in s:
                
                print(i)
                li.append(i)
            print(li,"appeid list")
# class AllUsers(APIView):
#     permission_classes=[IsAuthenticated]
#     print("****************************")
#     def patch(self,request,id):
#         print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
#         you=request.user
#         print(you.is_superuser)
#         print(you.email)
#         print(you.is_active)
#         user = get_object_or_404(Account,id=id)
#         print("555555555555555555555")
#         if user.is_active==True:
#             user.is_active=False
#             user.save()
#             return Response({'is_activefirst step false':user.is_active})
#         else:
#             user.is_active=True
#             user.save()
#             return Response({'is_active':user.is_active})

class AccountDetail(APIView):
    
    """
    Retrieve, update or delete a snippet instance.
    """
    # permission_classes = [AllowAny]
    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = AccountSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = AccountSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = AccountSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        
        
        
        
        
        
        
        
        
        
class BlockUSer(APIView):
    # permission_classes=[IsAuthenticated]
    def get(self,request,id):
        users=get_object_or_404(Account,id=id)
        if users.is_active==True:
            users.is_active=False
            users.save()
            return Response({'is_activefirst step false':users.is_active})
        else:
            users.is_active=True
            users.save()
            return Response({'is_active':users.is_active})
        
class BlockTutor(APIView):
    def get(self,request,id):
        tutor=get_object_or_404(Tutors,id=id)
        if tutor.is_active==True:
            tutor.is_active=False
            tutor.save()
            return Response({'is_activefirst step false':tutor.is_active})
        else:
            tutor.is_active=True
            tutor.save()
            return Response({'is_active':tutor.is_active})
        






@api_view(['GET'])
# @authentication_classes([JWTTutorAuthentication])
def Allcourse(request):
    print('***************************')
    try:
        if request.user:
            s=request.user.id
            print(s,'user id')
            interest=Account.objects.get(id=request.user.id)
            intr=interest.interests
            print(intr)
            # course=Course.objects.filter(category__title=intr)
            # print(course,'course id')
            queries=[Q(category__title__iendswith=value) for value in interest.interests]
            
            query=queries.pop()
           
            for item in queries:
                query != item
            courses = Course.objects.filter(query)
            print(courses)
            serializer = RecomentedCourseSerializer(courses,many=True)
            print(serializer,'PPPPPPPPPPPPPPPPPPPPP')
            return Response(serializer.data)
            # serializer = CourseSerializer(course,many=True)
            # return Response(serializer.data)
        # else:
            
            
    
        #     course=Course.objects.all()
        #     print(course,'course all')
        #     serializer = CourseSerializer(course,many=True)
        #     return Response(serializer.data)
    except:
        course=Course.objects.all()
        print(course,'course all')
        serializer = CourseSerializer(course,many=True)
        return Response(serializer.data)
    return Response("plesse login")

@api_view(['GET'])
def SingleCourse(request,id):
    print('&&&&&&&&&&&&&&&&&')
    singlecoure=Course.objects.filter(id=id)
    print(singlecoure)
    serailzer=CourseSerializer(singlecoure,many=True)
    return Response(serailzer.data)


@api_view(['GET'])
def ChapterList(request,id):
    print("@@@@@@@@@@@@@@@@@@@@")
    chapterlist=Chapter.objects.filter(id=Chapter.id)
    print(chapterlist)
    serializer=ChapterSerializer(chapterlist,many=True)
    print('llllllllllllllllllllllllllllllll')
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
# permission_classes=[IsAuthenticated]
def AllChapter(request,id):
    userss=request.user
    print(userss.id)
    print(userss)
    
    try:
        print('iiiiiiiiiiii')
        names=Order.objects.filter(user=userss,order_course=id,isPaid=True).first()
        print(names,'llllllllll')
        if names:
            course=Course.objects.get(id=id)
            print(course,'kkkkkkkkkkkk')
            s=course.id
            chapterr=Chapter.objects.filter(course=s)
            serializer=ChapterSerializer(chapterr,many=True)
            return Response(serializer.data)
        else:
            return Response("not found the data")
    except:
        return Response("please pay the amount")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def AfterpayAssignment(request,id):
    userss=request.user
    print(userss.id)
    print(userss)
    try:
        print('iiiiiiiiiiii')
        names=Order.objects.filter(user=userss,isPaid=True).first()
        print(names,'llllllllll')
        if names:
            course=Chapter.objects.get(id=id)
            print(course,'kkkkkkkkkkkk')
            s=course.id
            print(s)
            chapterr=Assignments.objects.get(chapter=s)
            print("lllllllllllllll")
            serializer=AssignmentSerializer(chapterr)
            print(':::::::::::::::::')
            print(serializer.data)
            return Response(serializer.data)
        else:
            return Response("not found the data")
    except:
        return Response("please enroll the course")
    
@api_view(['POST'])  
@permission_classes([IsAuthenticated])
def UserPostAssignment(request):
    # user = UserAssignment.objects.get(mobile=phone_number)   
    # serializer = userAssignmentSerailizer(user, many=False)
    # return Response(serializer.data)
    userss=request.user
    print(userss.id)
    print(userss)
    data=request.data
    print(data)
    users=Order.objects.filter(user=userss,isPaid=True)
    print(users,"check order")
    # for i in users:
    #     print (i.order_course)
    serializer = userAssignmentSerailizer(data=data)
    print('******************************')
    print(serializer)
    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data)
    else:
        return Response("please add correct details")
    
@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def userParchaseCourse(request):
    print(request.user)
    purchaseCourse=Order.objects.filter(user=request.user,isPaid=True)
    print(purchaseCourse)
    clist=[]
    for i in purchaseCourse:
        print(i.order_course.id,'*************')
        v=i.order_course.id
        print(type(i.order_course.id))
        Pcourse=Course.objects.get(id=v)
        serailzer=CourseSerializer(Pcourse)
        clist.append(serailzer.data)
    return Response(clist)
        
    
    # except:
    #     return ResourceWarning("YOu are not purchase any course")
@api_view(['GET'])  
@permission_classes([IsAuthenticated])       
def UsergetQuiz(request,id):
    try:
        user=purchaseCourse=Order.objects.filter(user=request.user,isPaid=True)
        print(purchaseCourse)
        if user:
            quiz=Quiz.objects.get(course=id)
            print(quiz)
            serailzer=QuizSerializer(quiz)
        return Response(serailzer.data)
    except:
        message = {'detail':'The mathcing query does  not exists'}
        return Response(message,status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])  
@permission_classes([IsAuthenticated])  
def usergetQustion(request,id):
    user=purchaseCourse=Order.objects.filter(user=request.user,isPaid=True)
    print(purchaseCourse)
    if user:
        questions=QuizQuestions.objects.filter(quiz=id)
        print(questions)
        serailzer=QuizQuestionSerializer(questions,many=True)
    return Response(serailzer.data)

@api_view(['POST'])  
@permission_classes([IsAuthenticated])  
def userPostAnswer(request,id):
    # user=purchaseCourse=Order.objects.filter(user=request.user,isPaid=True)
    try:
        user=Order.objects.filter(user=request.user,isPaid=True)
        # print(purchaseCourse)
        data=request.data
        if user:
            print('PPPPPPPPPPPPPPPPPP')
            answer=QuizQuestions.objects.filter(quiz=id)
            s=answer
            print(s)
            totalmarks=0
            
            # print(mark,'printappendfirst')
            if not UserQuizAnswers.objects.filter(question_no=data['question_no']).exists():
                if QuizQuestions.objects.filter(number=data['question_no']):
                    serializer=QuizAnswerSerializer(data=data)
                    print(serializer)
                    if QuizQuestions.objects.filter(right_ans=data['answer']):
                        print('******************')
                        totalmarks+=10
                        print('******************')
                        
                        # s=totalmarks
                        # print(mark,'mark')
                        print('******************')
                        
                        print('""""""""""""""""""""""""""')
                        # l=mark.append(s)
                        # print(l,'printappendlllllll')
                    else:
                        pass
                    if serializer.is_valid():
                        serializer.save()
                        marksss = Marks.objects.create(user=request.user,
                                                    mark=totalmarks,question_no=request.data['question_no'],Quiz=request.data['QuizQuestions'])
                        print(marksss)
                        #print
                        mrks=Marks.objects.filter(mark=10)
                        print(mrks)
                        total=[]
                        for i in mrks:
                            print(i.mark)
                            total.append(i.mark)
                        print(total)
                        s=sum(total)
                        totamarks=TotalMarks.objects.update(
                            user=request.user,
                            totalmark=s
                        )
                        print(sum(total))
                        print(totamarks)
                                
                                
                                
                        
                        # print(mark,'printappenddddddddddddddddddd')
                        return Response(serializer.data)
                    else:
                        return Response("something went wrong")
                else:
                     return Response("please add correct question number")
            else:
                # print(mark,'printappendlast')
                return Response("Youn area allredy taks  this question")
        else:
            return Response("pleas add correct details")
    except:
        return Response("something went wrong")
            
    
# @api_view(['GET'])  
# @permission_classes([IsAuthenticated])  
# def totlmarks(request):
#     s=Marks.objects.filter(user=request.user)
#     if s:
#         mrks=Marks.objects.filter(mark=10)
#         print(mrks)
#         total=[]
#         for i in mrks:
#             print(i.mark)
#             total.append(i.mark)
#         print(total)
#         s=sum(total)
#         totamarks=TotalMarks.objects.create(
#             user=request.user,
#             totalmark=s
#         )
#         print(sum(total))
#         print(totamarks)
#         return Response(status=status.HTTP_200_OK)
@api_view(['GET'])  
@permission_classes([IsAuthenticated])  
def ApplyCertificate(request,id):
    user=request.user
    print(user,'uuu')
    users=Order.objects.filter(order_course=id,user=request.user,isPaid=True)

    if users:
        print('************************')
        print(users)
        print('************************')
        
        print(users.values(),'mmmmmmmmmmmmmm')
        for i in users:
            s=i.user_id
        if s==user.id:
            print('kkkkkkkkkkkkk')
    
        try:
            if Quiz.objects.get(course=id):
                # if quiz:
                    print("kkkjksdfdhfhdsuifhishd")
                    # print(quiz)
                    userintotal=TotalMarks.objects.filter(user=request.user).last()
                    print(userintotal.totalmark)
                    print("))))))))))))))))")
                    if int(userintotal.totalmark)>=int(90):
                        print("elegible")
                        if not Certificate.objects.filter(username=request.user).exists():
                            cert=Certificate.objects.create(
                                username=request.user,
                                is_eligible=True,
                                course=id
                            )
                            return Response("You are eligible for certficate")
                        else:
                            return Response("you are allredy applied,certicate is processing")
                    else:
                        return Response("You are not eligible for certficate")
            else:
                return Response("please attend quiz")
        except:
            return Response("please attend quiz")
    else:
            return Response("please pay the course")
    
       
    
@api_view(['GET'])  
@permission_classes([IsAuthenticated])   
def GetCertificate(request):
    user=request.user.id
    print(user)
    users=PostCertificate.objects.filter(certicate=user,success=True)
    print(users)
    if user==True:
         serailzer=PostCertificateSerializer(users,many=True)
    return Response(serailzer.data)