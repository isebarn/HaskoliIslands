// Útflutt
//
// Notkun	: s = new pQueue();
// Eftir	: s er ný forgangsbiðröð
//
// Notkun	: s.push(X x)
// Fyrir	: s er forgangsbiðröð
// 			  x er hlutur af tagi X
// Eftir	: Búið er að bæta x á réttann stað í forgangsbiðröðina
//
// Notkun	: X m = s.pop()
// Fyrir	: s er forgangsbiðröð
// Eftir	: Búið er að fjarlægja fremsta gildið úr s og gilda m með því
//
// Notkun	: boolean b = s.isEmpty()
// Fyrir	: s er forgangsbiðröð
// Eftir	: Ef s er tóm forgangsbiðröð, þá er b gildað true, annars false

public class pQueue <T extends Comparable>{

	class Chain<X>{
		X value;
		Chain<X> next;
	}

	Chain<T> mainQueue;

	public pQueue(){
		mainQueue = null;
	}

	public void push(T x){
		Chain<T> temp1 = new Chain<T>();
		temp1.value = x;

		if(mainQueue == null || x.compareTo(mainQueue.value) >= 0){
			temp1.next = mainQueue;
			mainQueue = temp1;
			return;
		}

		Chain<T> temp2 = mainQueue;

		while(temp2.next != null && x.compareTo(temp2.next.value) < 0){
			temp2 = temp2.next;
		}

		temp1.next = temp2.next;
		temp2.next = temp1;
	}

	public T pop(){
		T value = mainQueue.value;
		mainQueue = mainQueue.next;
		return value;
	}

	public boolean isEmpty(){
		if(mainQueue.value != null) return false;
		return true;
	}



	public static void main(String[] args) {
		System.out.println(123);
		pQueue s = new pQueue();
		s.push(5);
		s.push(2);
		s.push(6);
		s.push(8);
		s.push(1);
		s.push(4);
		System.out.println(s.pop());
		System.out.println(s.pop());
		System.out.println(s.pop());
		System.out.println(s.pop());
		System.out.println(s.pop());
		System.out.println(s.pop());
	}
}