//
//  ScanViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/8/3.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "ScanViewController.h"
#import <AssetsLibrary/AssetsLibrary.h>

#import <AVFoundation/AVFoundation.h>

#define NAVBARHEIGHT 64


#define SCREENWIDTH     [UIScreen mainScreen].bounds.size.width

#define SCREENHEIGHT    [UIScreen mainScreen].bounds.size.height


#define TARGETY (SCREENHEIGHT - NAVBARHEIGHT - 300)/2

#define DARKCOLOR_ALPHA 0.5  //深色透明度



@interface ScanViewController ()<AVCaptureMetadataOutputObjectsDelegate,UIGestureRecognizerDelegate>
    
    {
        
        UIView *_scanView;
        
        NSTimer *_timer;
        
        UIImageView *_qrCodeline;;
        
        
    }
    
/**
 
 *  记录开始的缩放比例
 
 */

@property(nonatomic,assign)CGFloat beginGestureScale;

/**
 
 *  最后的缩放比例
 
 */

@property(nonatomic,assign)CGFloat effectiveScale;

/**
 
 *  照片输出流
 
 */

@property (nonatomic, strong)AVCaptureStillImageOutput* stillImageOutput;

@property (nonatomic, strong)UIImageView *focusImageV;


@property (nonatomic,retain)AVCaptureSession *capSession;

@property (strong, nonatomic)AVCaptureDeviceInput *input;

@property (strong, nonatomic)AVCaptureMetadataOutput *output;

@property (strong, nonatomic)AVCaptureVideoPreviewLayer *preview;



typedef void(^PropertyChangeBlock)(AVCaptureDevice *captureDevice);
    


@end

@implementation ScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    
    [self setScanView];
    
    
    
    self.effectiveScale = self.beginGestureScale = 1.0f;
    
    
    
    _isPush = NO;
    
    
    [self checkAVAuthorizationStatus];
    
    
    //画中间的基准线
    
    _qrCodeline = [[UIImageView alloc] initWithFrame:CGRectMake((SCREENWIDTH-300)/2,TARGETY, 300,2)];
    
    _qrCodeline.image = [UIImage imageNamed:@"saomiaoxian"];
    
    [self.view addSubview:_qrCodeline];
    
    
    [self createTimer];
    
    
    // Do any additional setup after loading the view.
}

- (void)createTimer
    
    {
        
        //创建一个时间计数
        
        _timer=[NSTimer scheduledTimerWithTimeInterval:3.0 target:self selector:@selector(moveUpAndDownLine) userInfo:nil repeats:YES];
        
    }
    
    //二维码的横线移动
    
- (void)moveUpAndDownLine
    
    {
        
        CGFloat Y=_qrCodeline.frame.origin.y;
        
        
        
        if (TARGETY + 300 ==Y){
            
            _qrCodeline.frame = CGRectMake((SCREENWIDTH-300)/2, TARGETY, 300,2);
            
        }else if(TARGETY ==Y){
            
            
            
        }
        
        [UIView beginAnimations:nil context:nil];
        
        [UIView setAnimationDuration:3];
        
        _qrCodeline.frame=CGRectMake((SCREENWIDTH-300)/2, TARGETY +300, 300,2);
        
        [UIView commitAnimations];
        
    }
    
- (void)stopTimer
    
    {
        
        if ([_timer isValid] == YES) {
            
            [_timer invalidate];
            
            _timer =nil;
            
        }
        
    }
    
    
#pragma mark -- 二维码的扫描区域
    
- (void)setScanView
    
    {
        
        _scanView=[[UIView alloc] initWithFrame:CGRectMake(0,0, SCREENWIDTH,SCREENHEIGHT-NAVBARHEIGHT)];
        
        _scanView.backgroundColor=[UIColor clearColor];
        
        
        
        /******************中间扫描区域****************************/
        
        
        
        UIImageView *scanCropView=[[UIImageView alloc] initWithFrame:CGRectMake((SCREENWIDTH-300)/2,TARGETY, 300,300)];
        
        scanCropView.image=[UIImage imageNamed:@"saoyisaolv"];
        
        //  scanCropView.layer.borderColor=[UIColor whiteColor].CGColor;
        
        //  scanCropView.layer.borderWidth=1.0;
        
        scanCropView.backgroundColor=[UIColor clearColor];
        
        [_scanView addSubview:scanCropView];
        
        
        
        //用于说明的label
        
        UILabel *labIntroudction= [[UILabel alloc] init];
        
        labIntroudction.backgroundColor = [UIColor clearColor];
        
        labIntroudction.frame=CGRectMake(0,CGRectGetMaxY(scanCropView.frame)+5, SCREENWIDTH,20);
        
        labIntroudction.numberOfLines=1;
        
        labIntroudction.font=[UIFont systemFontOfSize:15.0];
        
        labIntroudction.textAlignment = NSTextAlignmentCenter;
        
        labIntroudction.textColor=[UIColor clearColor];
        
        labIntroudction.text=@"将二维码对准方框，即可自动扫描";
        
        [_scanView addSubview:labIntroudction];
        
        
        
        
        
        
        
        
        
        UIView *darkViewBottom = [[UIView alloc] initWithFrame:CGRectMake(0, CGRectGetMaxY(scanCropView.frame),SCREENWIDTH, self.view.bounds.size.height - CGRectGetMaxY(scanCropView.frame))];
        
        darkViewBottom.backgroundColor = [[UIColor blackColor]  colorWithAlphaComponent:DARKCOLOR_ALPHA];
        
        [_scanView addSubview:darkViewBottom];
        
        
        
        UIView *darkViewleft = [[UIView alloc] initWithFrame:CGRectMake(0, 0 ,(SCREENWIDTH-300)/2, CGRectGetMinY(scanCropView.frame) + 300)];
        
        darkViewleft.backgroundColor = [[UIColor blackColor]  colorWithAlphaComponent:DARKCOLOR_ALPHA];
        
        [_scanView addSubview:darkViewleft];
        
        
        
        UIView *darkViewTop = [[UIView alloc] initWithFrame:CGRectMake(CGRectGetMaxX(darkViewleft.frame), 0 ,SCREENWIDTH - 2 * CGRectGetMaxX(darkViewleft.frame) , CGRectGetMinY(scanCropView.frame))];
        
        darkViewTop.backgroundColor = [[UIColor blackColor]  colorWithAlphaComponent:DARKCOLOR_ALPHA];
        
        [_scanView addSubview:darkViewTop];
        
        
        
        
        
        UIView *darkViewRight = [[UIView alloc] initWithFrame:CGRectMake(CGRectGetMaxX(scanCropView.frame), 0 ,SCREENWIDTH, self.view.bounds.size.height - CGRectGetHeight(darkViewBottom.frame))];
        
        darkViewRight.backgroundColor = [[UIColor blackColor]  colorWithAlphaComponent:DARKCOLOR_ALPHA];
        
        [_scanView addSubview:darkViewRight];
        
        
        
        
        
        
        
        //    UIImageView * bgImageView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"sanguang"]];
        
        //    bgImageView.frame = CGRectMake((SCREENWIDTH - 150)/2, 20, 150, 40);
        
        //    bgImageView.userInteractionEnabled = YES;
        
        //    [darkView addSubview:bgImageView];
        
        
        
        // 用于开关灯操作的button
        
        UIButton *openButton=[[UIButton alloc] initWithFrame:CGRectMake(0, 22,40,42)];
        
        [openButton setTitle:@"开启闪光灯" forState:UIControlStateNormal];
        
        openButton.titleEdgeInsets = UIEdgeInsetsMake(0, 40, 0, 0);
        
        [openButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        
        //    openButton.titleLabel.textAlignment=NSTextAlignmentCenter;
        
        openButton.titleLabel.font=[UIFont systemFontOfSize:20];
        
        [openButton addTarget:self action:@selector(openLight:)forControlEvents:UIControlEventTouchUpInside];
        
        [self.view addSubview:openButton];
        
        
        
        [self.view addSubview:_scanView];
        
    }
    
    
    
#pragma mark - 开扫描
    
- (void)checkAVAuthorizationStatus
    
    {
        
        NSString *mediaType = AVMediaTypeVideo;
        
        
        
        AVAuthorizationStatus author = [AVCaptureDevice authorizationStatusForMediaType:mediaType];
        
        if (ALAuthorizationStatusDenied == author)
        
        {
            
            UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"请授权访问相机" message:@"设置方式:手机设置->隐私->照机" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定" ,nil];
            
            [alertView show];
            
            return;
            
        }else if(ALAuthorizationStatusRestricted == author)
        
        {
            
            UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"您的相机权限受限" message:@"此应用程序没有被授权访问的照相机。可能是家长控制权限。" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
            
            [alertView show];
            
            return;
            
        }
        
        [self setupCamera];
        
        [self setUpGesture];
        
        [self addTapGensture];
        
        //
        
        
        
    }
    
    
    
    
    
    
    
    BOOL _isPush;
    
    
#pragma 创建手势
    
- (void)setUpGesture{
    
    
    
    UIPinchGestureRecognizer *pinch = [[UIPinchGestureRecognizer alloc] initWithTarget:self action:@selector(handlePinchGesture:)];
    
    pinch.delegate = self;
    
    [self.view addGestureRecognizer:pinch];
    
}
    
#pragma mark gestureRecognizer delegate
    
- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
    
    {
        
        if ( [gestureRecognizer isKindOfClass:[UIPinchGestureRecognizer class]] ) {
            
            self.beginGestureScale = self.effectiveScale;
            
        }
        
        return YES;
        
    }
    
    
    //缩放手势 用于调整焦距
    
- (void)handlePinchGesture:(UIPinchGestureRecognizer *)recognizer{
    
    
    
    BOOL allTouchesAreOnThePreviewLayer = YES;
    
    NSUInteger numTouches = [recognizer numberOfTouches], i;
    
    for ( i = 0; i < numTouches; ++i ) {
        
        CGPoint location = [recognizer locationOfTouch:i inView:self.view];
        
        CGPoint convertedLocation = [_preview convertPoint:location fromLayer:_preview.superlayer];
        
        if ( ! [_preview containsPoint:convertedLocation] ) {
            
            allTouchesAreOnThePreviewLayer = NO;
            
            break;
            
        }
        
    }
    
    
    
    if ( allTouchesAreOnThePreviewLayer ) {
        
        
        
        
        
        self.effectiveScale = self.beginGestureScale * recognizer.scale;
        
        if (self.effectiveScale < 1.0){
            
            self.effectiveScale = 1.0;
            
        }
        
        
        
        NSLog(@"%f-------------->%f------------recognizerScale%f",self.effectiveScale,self.beginGestureScale,recognizer.scale);
        
        
        
        CGFloat maxScaleAndCropFactor = [[self.stillImageOutput connectionWithMediaType:AVMediaTypeVideo] videoMaxScaleAndCropFactor];
        
        
        
        NSLog(@"%f",maxScaleAndCropFactor);
        
        
        
        //5.f为写死的最大放大倍数
        
        
        
        if (self.effectiveScale > 5.f)
        
        self.effectiveScale = 5.f;
        
        
        
        [CATransaction begin];
        
        [CATransaction setAnimationDuration:.025];
        
        [_preview setAffineTransform:CGAffineTransformMakeScale(self.effectiveScale, self.effectiveScale)];
        
        [CATransaction commit];
        
        
        
    }
    
    
    
}
    
    
    /**
     
     *  添加点按手势，点按时聚焦
     
     */
    
-(void)addTapGensture{
    
    UITapGestureRecognizer *tapGesture=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapScreen:)];
    
    [self.view addGestureRecognizer:tapGesture];
    
    
    
    _focusImageV = [[UIImageView alloc]initWithFrame:CGRectMake(0, 0, 76.f, 76.f)];
    
    _focusImageV.alpha = 0.f;
    
    _focusImageV.image = [UIImage imageNamed:@"camera_focus_red"];
    
    [self.view addSubview:_focusImageV];
    
}
    
-(void)tapScreen:(UITapGestureRecognizer *)tapGesture{
    
    CGPoint point= [tapGesture locationInView:self.view];
    
    //将UI坐标转化为摄像头坐标
    
    CGPoint cameraPoint= [_preview captureDevicePointOfInterestForPoint:point];
    
    [self setFocusImageWithPoint:point];
    
    [self focusWithMode:AVCaptureFocusModeAutoFocus exposureMode:AVCaptureExposureModeAutoExpose atPoint:cameraPoint];
    
}
    
    
    /**
     
     *  设置聚焦光标位置
     
     *
     
     *  @param point 光标位置
     
     */
    
-(void)setFocusImageWithPoint:(CGPoint)point{
    
    self.focusImageV.center=point;
    
    self.focusImageV.transform=CGAffineTransformMakeScale(1.5, 1.5);
    
    self.focusImageV.alpha=1.0;
    
    [UIView animateWithDuration:1.0 animations:^{
        
        self.focusImageV.transform=CGAffineTransformIdentity;
        
    } completion:^(BOOL finished) {
        
        self.focusImageV.alpha=0;
        
        
        
    }];
    
}
    
    /**
     
     *  设置聚焦点
     
     *
     
     *  @param point 聚焦点
     
     */
    
-(void)focusWithMode:(AVCaptureFocusMode)focusMode exposureMode:(AVCaptureExposureMode)exposureMode atPoint:(CGPoint)point{
    
    [self changeDeviceProperty:^(AVCaptureDevice *captureDevice) {
        
        if ([captureDevice isFocusModeSupported:focusMode]) {
            
            [captureDevice setFocusMode:AVCaptureFocusModeAutoFocus];
            
        }
        
        if ([captureDevice isFocusPointOfInterestSupported]) {
            
            [captureDevice setFocusPointOfInterest:point];
            
        }
        
        if ([captureDevice isExposureModeSupported:exposureMode]) {
            
            [captureDevice setExposureMode:AVCaptureExposureModeAutoExpose];
            
        }
        
        if ([captureDevice isExposurePointOfInterestSupported]) {
            
            [captureDevice setExposurePointOfInterest:point];
            
        }
        
    }];
    
}
    
    
    /**
     
     *  改变设备属性的统一操作方法
     
     *
     
     *  @param propertyChange 属性改变操作
     
     */
    
-(void)changeDeviceProperty:(PropertyChangeBlock)propertyChange{
    
    AVCaptureDevice *captureDevice= [self.input device];
    
    NSError *error;
    
    //注意改变设备属性前一定要首先调用lockForConfiguration:调用完之后使用unlockForConfiguration方法解锁
    
    if ([captureDevice lockForConfiguration:&error]) {
        
        propertyChange(captureDevice);
        
        [captureDevice unlockForConfiguration];
        
    }else{
        
        NSLog(@"设置设备属性过程发生错误，错误信息：%@",error.localizedDescription);
        
    }
    
}
    
    
    
    
- (void)setupCamera {
    
    
    
    
    
    
    
    //session---------------------------------
    
    _capSession = [[AVCaptureSession alloc] init];
    
    
    
    //input
    
    AVCaptureDevice *frontCamera = nil;
    
    AVCaptureDevice *backCamera = nil;
    
    
    
    
    
    NSArray *cameras = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    
    for (AVCaptureDevice *camera in cameras) {
        
        if (camera.position == AVCaptureDevicePositionFront) {
            
            frontCamera = camera;
            
        } else {
            
            backCamera = camera;
            
        }
        
    }
    
    
    
    
    
    [backCamera lockForConfiguration:nil];
    
    if ([backCamera isExposureModeSupported:AVCaptureExposureModeContinuousAutoExposure]) {
        
        [backCamera setExposureMode:AVCaptureExposureModeContinuousAutoExposure];
        
    }
    
    [backCamera unlockForConfiguration];
    
    
    
    
    
    _input = [AVCaptureDeviceInput deviceInputWithDevice:backCamera error:nil];
    
    [_capSession addInput:_input];
    
    
    
    
    
    
    
    // Output
    
    _output = [[AVCaptureMetadataOutput alloc]init];
    
    [_output setMetadataObjectsDelegate:self queue:dispatch_get_main_queue()];
    
    [_capSession addOutput:_output];
    
    
    
    
    
    // 条码类型 AVMetadataObjectTypeQRCode
    
    _output.metadataObjectTypes =@[AVMetadataObjectTypeQRCode];
    
    
    
    //preset
    
    _capSession.sessionPreset = AVCaptureSessionPresetHigh;
    
    
    
    //resolution
    
    if ([_capSession canSetSessionPreset:AVCaptureSessionPreset1920x1080]) {
        
        [_capSession setSessionPreset:AVCaptureSessionPreset1920x1080];
        
    }else if ([_capSession canSetSessionPreset:AVCaptureSessionPreset1280x720]) {
        
        [_capSession setSessionPreset:AVCaptureSessionPreset1280x720];
        
    }else if ([_capSession canSetSessionPreset:AVCaptureSessionPreset640x480]) {
        
        [_capSession setSessionPreset:AVCaptureSessionPreset640x480];
        
    }
    
    
    
    
    
    //preview layer-----------------
    
    _preview =[AVCaptureVideoPreviewLayer layerWithSession:_capSession];
    
    _preview.videoGravity = AVLayerVideoGravityResizeAspectFill;
    
    _preview.frame = self.view.bounds;
    
    [self.view.layer insertSublayer:self.preview atIndex:0];
    
    
    
    
    
    [_capSession startRunning];
    
    
    
}
    
#pragma mark -- 扫描回调
    
- (void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection{
    
    NSLog(@"测试");
    
    if (YES == _isPush) return ;
    
    
    
    _isPush = YES;
    
    NSString *stringValue;
    
    
    
    if ([metadataObjects count] >0)
    
    {
        
        AVMetadataMachineReadableCodeObject * metadataObject = [metadataObjects objectAtIndex:0];
        
        stringValue = metadataObject.stringValue;
        
    }
    
    [_capSession stopRunning];
    
    [_timer invalidate];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        
        //        [self.navigationController popViewControllerAnimated:NO];
        
        [_timer invalidate];
        
        //判断是否包含 头'http:'
        
        NSString *regex = @"http+:[^\\s]*";
        
        NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
        
        
        
        if ([predicate evaluateWithObject:stringValue]) {
            
            [self dismissViewControllerAnimated:YES completion:^{
                
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:stringValue]];
                
                
            }];
            
        }
        
        
        
        
    });
    
    
}
    
    
- (void)viewWillAppear:(BOOL)animated{
    
    [super viewWillAppear:animated];
    
    [_capSession startRunning];
    
    _isPush = NO;
    
}
    
- (void)viewWillDisappear:(BOOL)animated
    
    {
        
        //    [super viewWillDisappear:YES];
        
        
        
        //    if (_readerView.torchMode ==1) {
        
        //        _readerView.torchMode =0;
        
        //    }
        
        //    [self stopTimer];
        
        //
        
        //    [_readerView stop];
        
        [super viewWillDisappear:animated];
        
        if (self.capSession) {
            
            
            
            [self.capSession stopRunning];
            
        }
        
        [_timer invalidate];
        
        
        
        [_preview setAffineTransform:CGAffineTransformMakeScale(1, 1)];
        
    }
    
    
- (void)openLight:(UIButton *)btn{
    
    [self dismissViewControllerAnimated:YES completion:^{
        
        
        
    }];
    
}
    
    
- (void)didReceiveMemoryWarning {
    
    [super didReceiveMemoryWarning];
    
    // Dispose of any resources that can be recreated.
    
}
    
 
@end
