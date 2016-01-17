// Klárað: Já

public class pQueue<T extends Comparable>{
	
	class Unit<X>{
		X value;
		Unit<X> next;
	}

	Unit<T> mainQueue;

	public pQueue(){
		mainQueue = null;
	}

	public void add(T x){
		Unit<T> unit = new Unit<T>();
		unit.value = x;

		if(mainQueue == null || x.compareTo(mainQueue.value) >= 0){
			unit.next = mainQueue;
			mainQueue = unit;
			return;
		}

		Unit<T> temp = mainQueue;
		while(temp.next != null && x.compareTo(temp.next.value) < 0){
			temp = temp.next;
		}
		unit.next = temp.next;
		temp.next = unit;
	}

	public T remove(){
		T result = mainQueue.value;
		mainQueue = mainQueue.next;
		return result;
	}

	public boolean isEmpty(){
		if(mainQueue == null) return true;
		return false;
	}


	public static void main(String[] args) {
		System.out.println(123);
		pQueue a = new pQueue();
		a.add(4);
		a.add(2);
		System.out.println(a.isEmpty());
		a.add(6);
		a.add(1);
		System.out.println(a.remove());
		System.out.println(a.remove());
		System.out.println(a.isEmpty());
		System.out.println(a.remove());
		System.out.println(a.remove());
		System.out.println(a.isEmpty());

	}
}