# MIT 6.034 Lab 7: Support Vector Machines
# Written by Jessica Noss (jmn) and 6.034 staff

from svm_data import *

# Vector math
def dot_product(u, v):
    """Computes dot product of two vectors u and v, each represented as a tuple
    or list of coordinates.  Assume the two vectors are the same length."""
    return sum(u[i]*v[i] for i in range(len(u)))

def norm(v):
    "Computes length of a vector v, represented as a tuple or list of coords."
    return dot_product(v,v)**(0.5)

# Equation 1
def positiveness(svm, point):
    "Computes the expression (w dot x + b) for the given point"
    return dot_product(svm.w,point)+svm.b

def classify(svm, point):
    """Uses given SVM to classify a Point.  Assumes that point's true
    classification is unknown.  Returns +1 or -1, or 0 if point is on boundary"""
    if positiveness(svm,point)==0:
        return 0
    return positiveness(svm,point)/abs(positiveness(svm,point))

# Equation 2
def margin_width(svm):
    "Calculate margin width based on current boundary."
    return 2/norm(svm.w)

# Equation 3
def check_gutter_constraint(svm):
    """Returns the set of training points that violate one or both conditions:
        * gutter constraint (positiveness == classification for support vectors)
        * training points must not be between the gutters
    Assumes that the SVM has support vectors assigned."""
    vio=[]
    for sp_v in svm.support_vectors:
        if positiveness(svm,sp_v)!=1 and sp_v.classification==1:
            vio.append(sp_v)
        elif positiveness(svm,sp_v)!=-1 and sp_v.classification==-1:
            vio.append(sp_v)
    for tr_p in svm.training_points:
        if abs(positiveness(svm,tr_p))<1:
            vio.append(tr_p)
    return  set(vio)


# Equations 4, 5
def check_alpha_signs(svm):
    """Returns the set of training points that violate either condition:
        * all non-support-vector training points have alpha = 0
        * all support vectors have alpha > 0
    Assumes that the SVM has support vectors assigned, and that all training
    points have alpha values assigned."""
    vio=[]
    for sp_v in svm.support_vectors:
        if not sp_v.alpha>0:
            vio.append(sp_v)
    for tr_p in svm.training_points:
        if not tr_p.alpha==0 and not tr_p in svm.support_vectors:
            vio.append(tr_p)
    return  set(vio)

def check_alpha_equations(svm):
    """Returns True if both Lagrange-multiplier equations are satisfied,
    otherwise False.  Assumes that the SVM has support vectors assigned, and
    that all training points have alpha values assigned."""
    if sum(classify(svm,point)*point.alpha for point in svm.training_points)!=0:
        return False
    superposition=scalar_mult(classify(svm,svm.training_points[0])*svm.training_points[0].alpha,svm.training_points[0])
    for i in range(len(svm.training_points)):
        if i ==0:
            continue
        tem = scalar_mult(classify(svm, svm.training_points[i]) * svm.training_points[i].alpha,svm.training_points[i])
        superposition=vector_add(superposition,tem)
    if superposition==svm.w:
        return True
    return False

# Classification accuracy
def misclassified_training_points(svm):
    """Returns the set of training points that are classified incorrectly
    using the current decision boundary."""
    vio=[]
    for p in svm.training_points:
        if classify(svm,p)!=p.classification:
            vio.append(p)
    return set(vio)

# Training
def update_svm_from_alphas(svm):
    """Given an SVM with training data and alpha values, use alpha values to
    update the SVM's support vectors, w, and b.  Return the updated SVM."""
    spvs=[]
    for p in svm.training_points:
        if p.alpha>0:
            spvs.append(p)
    svm.support_vectors=spvs

    superposition=scalar_mult(svm.training_points[0].classification*svm.training_points[0].alpha,svm.training_points[0])
    for i in range(len(svm.training_points)):
        if i ==0:
            continue
        tem = scalar_mult(svm.training_points[i].classification * svm.training_points[i].alpha,svm.training_points[i])
        superposition=vector_add(superposition,tem)
    svm.w=superposition

    max=None
    min=None
    for spv in svm.support_vectors:
        if spv.classification==1:
            tem=spv.classification-dot_product(svm.w,spv)
            if tem > max or max==None:
                max = tem
        elif spv.classification==-1:
            tem=spv.classification-dot_product(svm.w,spv)
            if tem < min or min==None:
                min = tem

    svm.b=(max+min)/float(2)

    return svm



# Multiple choice
ANSWER_1 = 11
ANSWER_2 = 6
ANSWER_3 = 3
ANSWER_4 = 2

ANSWER_5 = ['A','D']
ANSWER_6 = ['A','B','D']
ANSWER_7 = ['A','B','D']
ANSWER_8 = []
ANSWER_9 = ['A','B','D']
ANSWER_10 = ['A','B','D']

ANSWER_11 = False
ANSWER_12 = True
ANSWER_13 = False
ANSWER_14 = False
ANSWER_15 = False
ANSWER_16 = True

ANSWER_17 = [1,3,6,8]
ANSWER_18 = [1,2,4,5,6,7,8]
ANSWER_19 = [1,2,4,5,6,7,8]

ANSWER_20 = 6


#### SURVEY ####################################################################

NAME = ""
COLLABORATORS = ""
HOW_MANY_HOURS_THIS_LAB_TOOK = 0
WHAT_I_FOUND_INTERESTING = ""
WHAT_I_FOUND_BORING = ""
SUGGESTIONS = ""