import moment from "moment";

export const getPageLoadTime = () => moment().format("Do MMMM YYYY hh:mm:ss A");

export const getCookieExpiryDay = (day) =>
  new Date(Date.now() + day * 24 * 60 * 60 * 1000);

// Moday, 15th June 2020 //  05:54 PM

/* Moment

Format	    Meaning	                Example
YYYY	    4-digits Year	        2018
YY	        2-digits Year	        18
M	        2-digits Month number, 
            omits leading 0	        7
MM	        2-digits Month number	07
MMM	        3-letters Month name	Jul
MMMM	    Full Month name	        July
dddd	    Full day name	        Sunday
gggg	    4-digits Week year	    2018
gg	        2-digits Week year	    18
w	        Week of the year 
            without leading zero	8
ww	        Week of the year 
            with leading zero	    18
e	        Day of the week, 
            starts at 0	            4
D	        2-digits day number, 
            omits leading 0	        9
DD	        2-digits day number	    09
Do	        Day number with 
            ordinal	                9th
T	        Indicates the start 
            of the time part	
HH	        2-digits hours 
            (24 hour time) 
            from 0 to 23	        22
H	        2-digits hours 
            (24 hour time) 
            from 0 to 23 
            without leading 0	    22
kk	        2-digits hours 
            (24 hour time) 
            from 1 to 24	        23
k	        2-digits hours 
            (24 hour time) 
            from 1 to 24 
            without leading 0	    23
a/A	        am or pm	            pm
hh	        2-digits hours 
            (12 hour time)	        11
mm	        2-digits minutes	    22
ss	        2-digits seconds	    40
s	        2-digits seconds 
            without leading zero	40
S	        1-digits milliseconds	1
SS	        2-digits milliseconds	12
SSS	        3-digits milliseconds	123
Z	        The timezone	        +02:00
x	        UNIX timestamp 
            in milliseconds	        1410432140575
--------------------------------------------------------------
Mutates the original moment by adding time.

This is a pretty robust function for adding time to an existing moment. To add time, pass the key of what time you want to add, and the amount you want to add.

moment().add(7, 'days');
There are some shorthand keys as well if you're into that whole brevity thing.

moment().add(7, 'd');
Key	Shorthand
years	y
quarters	Q
months	M
weeks	w
days	d
hours	h
minutes	m
seconds	s
milliseconds	ms
If you want to add multiple different keys at the same time, you can pass them in as an object literal.

moment().add(7, 'days').add(1, 'months'); // with chaining
moment().add({days:7,months:1}); // with object literal
There are no upper limits for the amounts, so you can overload any of the parameters.

moment().add(1000000, 'milliseconds'); // a million milliseconds
moment().add(360, 'days'); // 360 days

-- Moment */
