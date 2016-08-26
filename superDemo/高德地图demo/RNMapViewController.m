//
//  RNMapViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/16.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RNMapViewController.h"
#import "SearchList.h"
@interface RNMapViewController ()<MAMapViewDelegate,AMapLocationManagerDelegate,AMapSearchDelegate,UISearchBarDelegate>
{
    
    
    
    CGFloat _latitude;
    
    CGFloat _longitude;
    
    NSString *_currentCity;
    
}
@property (nonatomic, strong) MAAnnotationView *userLocationAnnotationView;

@property (nonatomic, strong) UISearchBar *searchBar;

@property (nonatomic, strong) MAMapView *mapView;

@property (nonatomic, strong) AMapSearchAPI *search;

@property (nonatomic, strong) UIControl *coverView;

@property (nonatomic, strong) SearchList *searchList;

@end

@implementation RNMapViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self setupUI];
//    [self setNavBar];


}

#pragma mark - UI

- (void)setupUI
{
    [self.view addSubview:self.mapView];

    [self.view addSubview:self.searchBar];
    
    [self.mapView addSubview:self.coverView];

    [self.mapView insertSubview:self.searchList aboveSubview:self.coverView];
    
}

#pragma mark - setter

-(SearchList *)searchList
{
    
    if (!_searchList) {
        
        _searchList = [[SearchList alloc]initWithFrame:CGRectMake(0, CGRectGetMaxY(self.searchBar.frame), SCREEN_WIDTH, SCREEN_HEIGHT/2)];
        
    }
    
    return _searchList;
}

-(UIControl *)coverView
{
    if (!_coverView) {
        
        _coverView = [[UIControl alloc]initWithFrame:self.view.bounds];
        
        _coverView.backgroundColor = [UIColor blackColor];
        
        _coverView.alpha = 0.5f;
        
        _coverView.hidden = YES;
        
        [_coverView addTarget:self action:@selector(coveViewClickAction) forControlEvents:UIControlEventTouchUpInside];
    }
    
    return _coverView;
}

-(MAMapView *)mapView
{
    if (!_mapView) {
        
        _mapView = [[MAMapView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.bounds), CGRectGetHeight(self.view.bounds))];
        
        _mapView.delegate = self;
        
        _mapView.showsUserLocation = YES;
        
        [_mapView setUserTrackingMode: MAUserTrackingModeFollow animated:YES]; //地图跟着位置移动

    }
    
    return _mapView;
}

- (UISearchBar *)searchBar
{
    if (!_searchBar) {
        
        _searchBar = [[UISearchBar alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, 74)];
        
        _searchBar.delegate = self;
        
        _searchBar.showsCancelButton = YES;
    }
    
    return _searchBar;
}

-(AMapSearchAPI *)search
{
    if (!_search) {
        
        _search = [[AMapSearchAPI alloc] init];
        _search.delegate = self;
        

    }
    
    return _search;
}


-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
    
}

-(void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    
//    self.navigationController.navigationBar.hidden = NO;
}

- (void)setNavBar
{
    
    UIBarButtonItem *rightItem = [[UIBarButtonItem alloc]initWithTitle:@"search" style:UIBarButtonItemStylePlain target:self action:@selector(mapSearchPOI)];
    
    self.navigationItem.rightBarButtonItem = rightItem;


}

#pragma mark - 定位服务
- (void)locationManager
{
    AMapLocationManager *loactionManager = [[AMapLocationManager alloc]init];
    
    // 带逆地理信息的一次定位（返回坐标和地址信息）
    [loactionManager setDesiredAccuracy:kCLLocationAccuracyBest];
    //   定位超时时间，最低2s，此处设置为2s
    loactionManager.locationTimeout =10;
    //   逆地理请求超时时间，最低2s，此处设置为2s
    loactionManager.reGeocodeTimeout = 10;
    
    // 带逆地理（返回坐标和地址信息）。将下面代码中的 YES 改成 NO ，则不会返回地址信息。
    [loactionManager requestLocationWithReGeocode:YES completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
        
        if (error)
        {
            NSLog(@"locError:{%ld - %@};", (long)error.code, error);
            
            if (error.code == AMapLocationErrorLocateFailed)
            {
                return;
            }
        }
        
        NSLog(@"location:%@", location);
        
        if (regeocode)
        {
            NSLog(@"reGeocode:%@", regeocode.city);
        }
    }];
}

#pragma mark - 查询服务

-(void)mapSearchPOIWithKeyWord:(NSString *)keyWord
{

    

    //构造AMapCloudPOILocalSearchRequest对象，设置本地检索请求参数
    AMapInputTipsSearchRequest *request = [[AMapInputTipsSearchRequest alloc] init];
    request.keywords = keyWord;
    request.city = @"广州";
    
    //发起云本地检索
    [self.search AMapInputTipsSearch: request];


}



#pragma mark - 天气查询

- (void)searchWeather
{
    //初始化检索对象

    //构造AMapWeatherSearchRequest对象，配置查询参数
    AMapWeatherSearchRequest *request = [[AMapWeatherSearchRequest alloc] init];
    request.city = @"广州";
    request.type = AMapWeatherTypeForecast; //AMapWeatherTypeLive为实时天气；AMapWeatherTypeForecase为预报天气
    
    //发起行政区划查询
    [self.search AMapWeatherSearch:request];
}

-(void)mapView:(MAMapView *)mapView didUpdateUserLocation:(MAUserLocation *)userLocation
updatingLocation:(BOOL)updatingLocation
{
    if(updatingLocation)
    {
        //取出当前位置的坐标
        NSLog(@"latitude : %f,longitude: %f",userLocation.coordinate.latitude,userLocation.coordinate.longitude);
        
        _latitude = userLocation.coordinate.latitude;
        
        _longitude = userLocation.coordinate.longitude;
        
        
        AMapReGeocodeSearchRequest *regeo = [[AMapReGeocodeSearchRequest alloc] init];
        regeo.location = [AMapGeoPoint locationWithLatitude:userLocation.coordinate.latitude longitude:userLocation.coordinate.longitude];
        regeo.requireExtension = YES;
        //发起逆地理编码
        [self.search AMapReGoecodeSearch:regeo];
        
        self.mapView.showsUserLocation = !self.mapView.isShowsUserLocation;
        
    }
}

/* 逆地理编码回调. */
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response
{
    if (response)
    {
        
        NSLog(@"formattedAddress>>> %@",response.regeocode.addressComponent.city);
        
        _currentCity = response.regeocode.addressComponent.city;
        
        UIAlertView*alter = [[UIAlertView alloc]initWithTitle:@"提示"message:[NSString stringWithFormat:@"您所在城市是：%@",_currentCity] delegate:nil cancelButtonTitle:@"确定"otherButtonTitles:nil];
        
        [alter show];
 
    }
}


//实现输入提示的回调函数
-(void)onInputTipsSearchDone:(AMapInputTipsSearchRequest*)request response:(AMapInputTipsSearchResponse *)response
{
    if(response.tips.count == 0)
    {
        return;
    }
    
    //通过AMapInputTipsSearchResponse对象处理搜索结果
    NSString *strCount = [NSString stringWithFormat:@"count: %d", response.count];
    NSString *strtips = @"";
    NSMutableArray *resultArr = [NSMutableArray array];
    
    for (AMapTip *p in response.tips) {
        strtips = [NSString stringWithFormat:@"%@\nTip: %@", strtips, p.name];
        
        [resultArr addObject:p];
    }
    
    [self.searchList setResultArray:resultArr];
    
    NSString *result = [NSString stringWithFormat:@"%@ \n %@", strCount, strtips];
    NSLog(@"InputTips: %@", result);
}
//实现天气查询的回调函数
- (void)onWeatherSearchDone:(AMapWeatherSearchRequest *)request response:(AMapWeatherSearchResponse *)response
{
    //如果是实时天气
    if(request.type == AMapWeatherTypeLive)
    {
        if(response.lives.count == 0)
        {
            return;
        }
        for (AMapLocalWeatherLive *live in response.lives) {
            
            NSLog(@"%@",live.weather);
        }
    }
    //如果是预报天气
    else
    {
        if(response.forecasts.count == 0)
        {
            return;
        }
        for (AMapLocalWeatherForecast *forecast in response.forecasts) {
            
        }
    }
    
    
}

#pragma mark - target

- (void)coveViewClickAction
{
    [self.searchList hide];
    
    self.coverView.hidden = YES;
}

#pragma mark - searchBarDelegate
-(void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText
{
    
    NSLog(@"didchange");

    [self mapSearchPOIWithKeyWord:searchText];
}

-(void)searchBarTextDidBeginEditing:(UISearchBar *)searchBar
{

    [self.searchList show];
    
    self.coverView.hidden = NO;
    
    NSLog(@"didbegin");
}

-(void)searchBarTextDidEndEditing:(UISearchBar *)searchBar
{

    NSLog(@"didend");
    

}

-(void)searchBarCancelButtonClicked:(UISearchBar *)searchBar
{

    [self.searchList hide];

    [searchBar resignFirstResponder];
    
    self.coverView.hidden = YES;
    
    NSLog(@"cancle");
}
@end
