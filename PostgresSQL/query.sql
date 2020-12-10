--I want all the infromation from lsitings table given a listing id
-- input (id) -> lsiting

--I want all the reservations tied with that listing id but only their checkin checkout dates
-- input(lisitng_id) -> multiple reservations

--somehow joing two queries together

EXPLAIN ANALYZE
SELECT *
  FROM listings INNER JOIN reservations ON (listings.id=reservations.listing_id)
  WHERE listings.id=50000;



Postgress querytime
  ailpupdb=# EXPLAIN ANALYZE
ailpupdb-# SELECT *
ailpupdb-#   FROM listings INNER JOIN reservations ON (listings.id=reservations.listing_id)
ailpupdb-#   WHERE listings.id=50000;
                                                                QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop  (cost=1000.43..488677.11 rows=34 width=86) (actual time=16167.233..16895.098 rows=1 loops=1)
   ->  Index Scan using listings_pkey on listings  (cost=0.43..8.45 rows=1 width=38) (actual time=7.349..7.353 rows=1 loops=1)
         Index Cond: (id = 50000)
   ->  Gather  (cost=1000.00..488668.32 rows=34 width=48) (actual time=16159.876..16887.735 rows=1 loops=1)
         Workers Planned: 2
         Workers Launched: 2
         ->  Parallel Seq Scan on reservations  (cost=0.00..487664.92 rows=14 width=48) (actual time=16617.859..16857.966 rows=0 loops=3)
               Filter: (listing_id = 50000)
               Rows Removed by Filter: 10475496
 Planning Time: 0.137 ms
 Execution Time: 16895.147 ms



 Sample Postgres QUERY
 ailpupdb=# SELECT *
ailpupdb-#   FROM listings INNER JOIN reservations ON (listings.id=reservations.listing_id)
ailpupdb-#   WHERE listings.id=50000;
     name     | maxstay | maxguests | feepernight | feecleaning | feeservice | owner |  id   | checkindate | checkoutdate | adults | children | infants | totalcost | listing_id | user_id
--------------+---------+-----------+-------------+-------------+------------+-------+-------+-------------+--------------+--------+----------+---------+-----------+------------+---------
 quidem velit |      23 |        12 |         283 |          83 |         16 | 74841 | 50000 | 2020-12-15  | 2021-01-05   |      5 |        0 |       5 |   6767.04 |      50000 |  813627
(1 row)

(END)
