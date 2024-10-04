#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char *formatNumber(char *input, char begin, char divider)
{
    int length = strlen(input);
    int formattedLenght = length + length / 3 + 2;
    char *formattedNumber = (char *)malloc(formattedLenght);
    int j = 0;
    int commaCount = length % 3;
    formattedNumber[0] = begin;
    j = j + 1;
    for (int i = 0; i < length; i++)
    {
        formattedNumber[j] = input[i];
        j = j + 1;
        if (commaCount > 0 && i < length - 1 && (i + 1) % 3 == commaCount)
        {
            formattedNumber[j++] = divider;
        }
        else if (commaCount == 0 && i < length - 1 && (i + 1) % 3 == 0)
        {
            formattedNumber[j++] = divider;
        }
    }
    formattedNumber[j] = '\0';
    return formattedNumber;
}
/**
 * @param argc the number of argument
 * @param argv arguments
 */
int main(int argc, char *argv[])
{
    /**
     * 1. read a character from file
     * 2. fgetc() return int therefore it's better to set the int here
     */
    FILE *outputFile = fopen(argv[1], "w");
    // Allocate memory to save one complete number into
    char *number = (char *)malloc(10 * sizeof(char));

    int index = 0;
    int c = fgetc(stdin);
    while (c != EOF)
    {
        // Accumulate the digits until we completely read one number
        if (c != ' ')
        {
            number[index] = c;
            index++;
        }
        if (c == ' ')
        {
            if (index > 0)
            {
                // End the string as we completely read the number
                number[index] = '\0';
                // Formatting
                char *formattedNumber =
                    formatNumber(number, argv[2][0], argv[3][0]);

                // Write to destination
                fprintf(outputFile, " %s ", formattedNumber);
                // will immediately flush the data to the file
                // fflush(outputFile);
                // Reset malloc
                free(number);
                free(formattedNumber);
                number = (char *)malloc(10 * sizeof(char)); // need to reset
                index = 0;
            }
        }
        // Once we finish writing the string to file we read another string
        c = fgetc(stdin);
    }
    fclose(outputFile);
    // exit(0);
    return 0;
}
