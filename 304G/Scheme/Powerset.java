import java.util.*;
public class Powerset {
    protected static <T> Set<T> copyWithout(Set<T> s, T e) {
        Set<T> result = new HashSet<T>(s);
        result.remove(e);
        return result;
    }
    protected static <T> Set<T> copyWith(Set<T> s, T e) {
        Set<T> result = new HashSet<T>(s);
        result.add(e);
        return result;
    }
    public static <T> Set<Set<T>> powerset(Set<T> s) {
        Set<Set<T>> result = new HashSet<Set<T>>();
        if(s.isEmpty()) {
            Set<T> empty = Collections.emptySet();
            result.add(empty);
        } else {
            for (T e : s) {
                Set<T> t = copyWithout(s, e);
                Set<Set<T>> ps = powerset(t);
                result.addAll(ps);
                for (Set<T> ts : ps) {
                    result.add(copyWith(ts, e));
                }
            }
        }
        return result;
    }
    public static void main(String[] args) {
        Set<String> s = new HashSet<String>();
        s.add("a");
        s.add("b");
        s.add("c");
        s.add("d");
        s.add("e");
        s.add("f");
        s.add("g");
        s.add("h");
        s.add("i");
        s.add("j");
        s.add("k");
        /*s.add("l");
        s.add("m");
        s.add("n");*/
        System.out.println(powerset(s));
    }
}