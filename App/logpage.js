var firebaseConfig = {
	apiKey: "AIzaSyCMywtU09-EbDCbXoZPzpfuSiloafMEreg",
	authDomain: "login-222221.firebaseapp.com",
	projectId: "login-222221",
	storageBucket: "login-222221.appspot.com",
	messagingSenderId: "255427681660",
	appId: "1:255427681660:web:1d712c606f4087163158f9",
	measurementId: "G-K7W35SN288"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp() {
	var e = document.getElementById("email"),
		a = document.getElementById("password");
	auth.createUserWithEmailAndPassword(e.value, a.value).catch(e => alert(e.message)), alert("Signed Up")
}

function signIn() {
	var e = document.getElementById("email"),
		a = document.getElementById("password");
	auth.signInWithEmailAndPassword(e.value, a.value).catch(e => alert(e.message))
}

function signOut() {
	auth.signOut(), alert("Signed Out"), window.location = "index.html"
}
auth.onAuthStateChanged(function (e) {
	if (e) {
		var a = e.email;
		alert("Active User " + a),
			window.location = "Event/index.html"
	} else alert("No Active User")
});