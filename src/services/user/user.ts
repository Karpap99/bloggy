import { db } from "@/src/hooks/firebase/firebase"
import { User, UserLogin, UserLoginSchema, UserRegister, UserRegisterSchema } from "@/src/types/user"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, } from "firebase/firestore"

export const addUser = async (user: UserRegister) => { 
    const parsed = UserRegisterSchema
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    }).safeParse(user);


    if (!parsed.success) {
        throw new Error("Invalid user data");
    }

    const { email, password } = parsed.data;
    
    return addDoc(collection(db, "users"), {
        ...{
            email: email,
            password: password,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}


export const LogInUser = async (userLogin: UserLogin) => {
    const parsed = UserLoginSchema.safeParse(userLogin);
    if (!parsed.success) {
        throw new Error("Invalid user data");
    }
    const { email, password } = parsed.data;

    const usersRef = collection(db, "users");
    const q = query(
        usersRef,
        where("email", "==", email),
        where("password", "==", password)
    );

    const querySnap = await getDocs(q);
    if (querySnap.empty) {
        throw new Error("Invalid email or password");
    }
    const docSnap = querySnap.docs[0];
    return { 
        id: docSnap.id, 
        ...docSnap.data(), 
        ...{
            createdAt: docSnap.data().createdAt.toDate().toISOString(), 
            updatedAt: docSnap.data().updatedAt.toDate().toISOString()
        } 
    } as User;
};

export const getUser = async (id: string) => {
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data(), ...{createdAt: userSnap.data().createdAt.toDate().toISOString(), updatedAt: userSnap.data().updatedAt.toDate().toISOString()} } as User;
    }
    return null;
}

export const getUsers = async () => {
    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);
    return usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), ...{createdAt: doc.data().createdAt.toDate().toISOString(), updatedAt: doc.data().updatedAt.toDate().toISOString()} } as User));
}

export const updateUser = async (id: string, user: Partial<User>) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, user);
}


export const deleteUser = async (id: string) => {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
}