# Massive Communication Demo

This project is designed to generate a huge amount of number then format them with the `$`
and `,` symbol, ensuring smooth inter-process communication performance with stable CPU usage and memory.

> **dest.txt** : The formatting number
> **text-gigantic.txt**: The original the number
> **main**: The unix executable file of number_formatter.c

### Test massive io communication

```bash
./test_massive_io.sh
```

### Develop with number formatter

```bash
./watch_number_formatter.sh
```

### Dynamically generate text-gigantic.txt

**Example**: node generateNumberText.js 200

```bash
node generateNumberText.js [the-amount-of-numbers]
```

### Format the number of text-gigantic.txt

```bash
node app.js
```

### Remove all the generated files or compiled files

```bash
./clearup.sh
```
