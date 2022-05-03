BEGIN {
FS = ","
OFS = ","
}
{
print $1, $8, $9  > "judgesTable.csv"
print $7, $4, $5, $6 > "carsTable.csv"
print $7, $3, $2 > "ownersTable.csv"
}
END{
}
