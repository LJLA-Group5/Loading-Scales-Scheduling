 SELECT * FROM reservations_by_reservation_id WHERE listing_id=90000;

 cqlsh:listings>  SELECT * FROM reservations_by_reservation_id WHERE reservation_id=1 ALLOW FILTERING;

 reservation_id | adults | checkindate | checkoutdate | children | infants | listing_id | totalcost | user_id
----------------+--------+-------------+--------------+----------+---------+------------+-----------+---------
              1 |      9 |  2020-12-11 |   2020-12-15 |        5 |       0 |          1 |    949.76 |    5607

(1 rows)
cqlsh:listings>

tracing on;
 SELECT * FROM reservations_by_reservation_id WHERE reservation_id=90000;

 Tracing session: e9b7efd0-3acb-11eb-b1c1-c187e15a086a

 activity                                                                                                       | timestamp                  | source    | source_elapsed | client
----------------------------------------------------------------------------------------------------------------+----------------------------+-----------+----------------+-----------
                                                                                             Execute CQL3 query | 2020-12-10 01:41:43.903000 | 127.0.0.1 |              0 | 127.0.0.1
 Parsing SELECT * FROM reservations_by_reservation_id WHERE reservation_id=90000; [Native-Transport-Requests-1] | 2020-12-10 01:41:43.982000 | 127.0.0.1 |          84053 | 127.0.0.1
                                                              Preparing statement [Native-Transport-Requests-1] | 2020-12-10 01:41:43.983000 | 127.0.0.1 |          85432 | 127.0.0.1
                               Executing single-partition query on reservations_by_reservation_id [ReadStage-2] | 2020-12-10 01:41:43.985000 | 127.0.0.1 |          87106 | 127.0.0.1
                                                                     Acquiring sstable references [ReadStage-2] | 2020-12-10 01:41:43.985000 | 127.0.0.1 |          87379 | 127.0.0.1
                                                                        Merging memtable contents [ReadStage-2] | 2020-12-10 01:41:43.985000 | 127.0.0.1 |          87677 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 765 [ReadStage-2] | 2020-12-10 01:41:44.007000 | 127.0.0.1 |         109536 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 764 [ReadStage-2] | 2020-12-10 01:41:44.009000 | 127.0.0.1 |         111434 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 763 [ReadStage-2] | 2020-12-10 01:41:44.011000 | 127.0.0.1 |         112724 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 761 [ReadStage-2] | 2020-12-10 01:41:44.011000 | 127.0.0.1 |         113689 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 707 [ReadStage-2] | 2020-12-10 01:41:44.012000 | 127.0.0.1 |         114451 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 694 [ReadStage-2] | 2020-12-10 01:41:44.013000 | 127.0.0.1 |         115185 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 657 [ReadStage-2] | 2020-12-10 01:41:44.014000 | 127.0.0.1 |         115959 | 127.0.0.1
                                                         Bloom filter allows skipping sstable 444 [ReadStage-2] | 2020-12-10 01:41:44.015000 | 127.0.0.1 |         117481 | 127.0.0.1
                                             Partition index with 0 entries found for sstable 230 [ReadStage-2] | 2020-12-10 01:41:44.023000 | 127.0.0.1 |         124998 | 127.0.0.1
                                                           Read 1 live rows and 0 tombstone cells [ReadStage-2] | 2020-12-10 01:41:44.026000 | 127.0.0.1 |         127815 | 127.0.0.1
                                                                                               Request complete | 2020-12-10 01:41:44.031640 | 127.0.0.1 |         128640 | 127.0.0.1