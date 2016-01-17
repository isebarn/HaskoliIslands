// Design document for a polymorphic queue  in Java
//
//	Exported
//
//	Usage	: queue s = new queue();
//	After	: s is a new, empty queue
//
//	Usage	: s.add(x);
//	Before	: s is either an empty queue or a queue with elements of type X
//			  x is an object of type X
//	After	: x has been added to the front of s
//
//	Usage	: X m = s.pop();
//	Before	: s is a non-empty queue with objects of type X
//	After	: The object last added to s has been removed from s, and m assigned that value
//
//	Usage	: boolean b = s.isEmpty();
//	Before	: s is a queue
//	After	: if s is empty, b is true, otherwise b is false


public class queue <T extends Comparable>{

	class Chain<X>{
		X value;
		Chain<X> next;
	}

	Chain<T> mainQueue;

	public queue(){
		mainQueue = null;
	}

	public void add(T x){
		Chain<T> temp = new Chain<T>();
		temp.value = x;
		temp.next = mainQueue;
		mainQueue = temp;
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
		queue test = new queue();
		test.add(5);
		test.add(2);
		test.add(3);
		test.add(8);
		System.out.println(test.pop());
		System.out.println(test.pop());
		System.out.println(test.pop());
		System.out.println(test.pop());
	}
}