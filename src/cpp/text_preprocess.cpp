#include <cstring>
#include <cctype>

extern "C" __declspec(dllexport)
void preprocess_text(const char* input, char* output) {
    int j = 0;

    for (int i = 0; input[i] != '\0'; i++) {
        char c = tolower(input[i]);

        // remove punctuation & digits
        if (isalnum(c) || isspace(c)) {
            if (!isdigit(c)) {
                output[j++] = c;
            }
        }
    }

    output[j] = '\0';
}
