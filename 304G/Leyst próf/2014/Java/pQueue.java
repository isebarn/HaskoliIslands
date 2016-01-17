public class pQueue<T extends Comparable>{

	class Link<X>{
		X value;
		Link<X>  next;
	}

	Link<T> mainQueue = new Link<T>();

	public pQueue(){
		mainQueue = null;
	}

	public void add(T x){
		Link<T> temp = new Link<T>();
		temp.value = x;

		if(mainQueue == null || x.compareTo(mainQueue.value) >= 0){
			temp.next = mainQueue;
			mainQueue = temp;
		}

		Link<T> temp2 = mainQueue;
		if(temp2.next != null && x.compareTo(temp2.next.value) < 0){
			temp2 = temp2.next;
		}

		temp.next = temp2.next;
		temp2.value = x;
	}

	public T remove(){
		T val = mainQueue.value;
		mainQueue = mainQueue.next;
		return val;
	}

	public boolean isEmpty(){
		if(mainQueue == null) return true;
		return false;
	}



	public static void main(String[] args) {
		System.out.println(123);
		pQueue a = new pQueue();
		a.add(5);
		a.add(2);
		a.add(7);
		a.add(1);
		a.add(3);
	}
}