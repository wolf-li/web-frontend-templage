#!/bin/bash
# auth: wolf-li
# version: 0.0.2

service=frontend-templage
build_dir=$service-dist
build_file=$build_dir.tar.gz
package_file=deploy-package.tar.gz
nginx_install=install-nginx.sh
deploy_file=(
    $build_file
    $nginx_install
    default.conf.template
)
nginx_status=0
nginx_dir=/data/nginx

function clean(){
    if [[ -d ../$build_dir ]];then
        rm -rf ../$build_dir
    fi
    if [[ -f $build_file ]];then
        rm -f $build_file
    fi
    if [[ -f $package_file ]];then
        rm -f $package_file
    fi
}


function package(){
    clean
    cd ..
    if [[ ! -f package.json ]];then
        echo "not in $service project"
        exit
    fi
    if [[ -d $build_dir ]];then
        rm -rf $build_dir
    fi
    npm run build
    if [[ $? -ne 0 ]];then
        echo "build fail"
        exit
    fi
    mv dist $build_dir
    tar czf ./deploy/$build_file $build_dir/
    tar czf ./deploy/$package_file ./deploy
}

function service_check() {
  if [ $(ps aux | grep $1 | grep -v grep | wc -l) -eq 0 ]; then
    echo "$1 not found"
    return 0
  else
    return 1
  fi
}

function install_nginx(){
    service_check nginx
    if [[ nginx_status -eq 0 ]];then
        echo "install nginx ..."
        if [ ! -x "$nginx_install" ]; then
            echo "正在为 '$nginx_install' 添加执行权限..."
            chmod +x "$nginx_install"
            if [ $? -eq 0 ]; then
            echo "添加权限成功。"
            else
            echo "添加权限失败。"
            fi
        else
            echo "'$nginx_install' 已具有执行权限。"
            ./$nginx_install
        fi
    fi
}

function deploy(){
    # file check
    file_exist=0
    for i in "${deploy_file[@]}";do
        if [[ ! -f $i ]];then 
            echo "$i file not exist!!!"
            file_exist=$(( file_exist + 1 ))
        fi
    done
    if (( file_exist > 0 ));then
        echo "check the file"
        exit
    fi

    service_check nginx
    if [[ $? -eq 0 ]];then
        exit
    fi
    
    tar xzf $build_file
    cp -r $build_dir/* ${nginx_dir}/html
    chown nginx:nginx ${nginx_dir}/html

    rm -f ${nginx_dir}/conf.d/default.conf
    mv ${deploy_file[2]} ${nginx_dir}/conf.d/frontend.conf
    read -p "intput backend_url:" backend_url
    sed -i "s,\${BACKEND_URL},$backend_url,g" ${nginx_dir}/conf.d/frontend.conf
    sed -i "s,root /usr/share/nginx/html,root ${nginx_dir}/html," ${nginx_dir}/conf.d/frontend.conf
    nginx -t
    if [[ $? -ne 0 ]];then
        echo "config wrong"
        exit
    fi
    nginx -s reload
    echo "$service deploy successful"
}

function help(){
    echo "usage: ./deploy.sh [OPTION]"
    echo "  --clean      rm the package file"
    echo "  --package    package the frontend project with deploy script out file $package_file"
    echo "  --deploy     deploy the frontend project using nginx"
    echo "  --help       help infomation"
}


if [[ $# -ne 1 ]];then
    echo "wrong args!"
    help
    exit
fi

case $1 in
    --clean )
        clean
        ;;
    --package )
        package 
        ;;
    --deploy )
        deploy 
        ;;
    --help )
        help
        ;;
    *)
        echo "wrong args!"
        help
        ;;
esac
