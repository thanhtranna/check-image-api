var app = document.app;

app.controller("uploadController", ['$scope','$http', function($scope, $http){
    $scope.loading = false;
    $scope.init = function (uploadConfig) {
        $scope.uploadConfig = uploadConfig;
        $scope.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
        // $http.get('/getUserCurrent')
        //     .then((result) => {
        //         if(result.status === 200) {
        //             $scope.fullname = result.data.fullName;
        //             $scope.dateofbirth = new Date(result.data.dateOfBirth);
        //             $scope.idnumber = result.data.idNumber;
        //             $scope.nation = result.data.nation;
        //             $scope.idImage = result.data.linkToIdImage;
        //             $scope.selfieIdImage = result.data.linkToSelfieImage;
        //         }
        //     }, function (error) {
        //         console.log(error);
        //     });
        function readURL(input, target) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#' + target +'_preview').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        function checkingFile(input) {
            var file = input.files[0],
                allowExtensions = $scope.uploadConfig.allowExtensions,
                maxSize = $scope.uploadConfig.maxSize,
                maxSizeInMb = Math.floor(maxSize / 1024 / 1024),
                extension = file.name.split('.').pop();

            if (allowExtensions.indexOf(extension.toLowerCase()) === -1)
                return {isValid: false, message: "Not support format: " + extension};

            var size = file.size;
            if (size > maxSize)
                return {isValid: false, message: "File too large, only support under " + maxSizeInMb + ' megabyte'};

            return {isValid: true};
        }
        $("input[type=file]").change(function(){
            // Checking file
            var validationFile = checkingFile(this);
            if (!validationFile.isValid) {
                toastr.error("", validationFile.message);
                return;
            }

            var target = $(this).data('target');
            console.log(target);
            readURL(this, target);
            // update input file name
            let filename = this.files[0].name;
            $("input[name=" + target + "]").val(filename);
            $scope.$apply(function() {
                $scope[target] = filename;
            });
        });
    };
    $scope.onUpload = function () {
        $scope.loading = true;
    };


}]);
